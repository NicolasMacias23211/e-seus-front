import type { Login, } from "../models/login";
import { HttpService } from "./http";
import { env } from "../config/env";
import { SessionStorageService } from "./SessionStorageService";
import { eUsersService } from "./e-usersService";

export class LoginService extends HttpService {
  private sessionStorageService = new SessionStorageService();
  private eUsersService = new eUsersService();

  public async login(user: string, password: string): Promise<Login> {
    try {
      const eldapResponse: Login = await this.getEldapLogin(user, password);

      if (eldapResponse.success && eldapResponse.user) {
        if (eldapResponse.success) {
          this.sessionStorageService.setItem(
            "authTokens",
            eldapResponse.tokens
          );
          const isEUser = await this.checkEUserStatus(
            eldapResponse.user.username
          );
          eldapResponse.user.isEUser = isEUser;
          this.sessionStorageService.setItem(
            "userInfo",
            eldapResponse.user
          );
        }
      }       
      return eldapResponse;
    } catch (error) {
      console.error("Error durante el proceso de login:", error);
      throw error;
    }
  }

  public async getEldapLogin(
    user: string,
    password: string
  ): Promise<Login> {
    
    const url = `${env.apiBaseUrl}/auth/login/`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    const body = {
      user: user,
      password: password,
    };

    const opciones: RequestInit = {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    };

    try {
      const response = await fetch(url, opciones);

      if (!response.ok) {
        console.error(
          `Error del servidor ELDAP: ${response.status} ${response.statusText}`
        );
      }

      const data: Login = await response.json();
      return data;
    } catch (error) {
      console.error("No se pudo conectar al servicio ELDAP:", error);
      throw error;
    }
  }

  private async checkEUserStatus(username: string): Promise<boolean> {
    try {
      const response = await this.eUsersService.GetEUsersByNetworkUser(
        username
      );
      return response.success && response.data !== null;
    } catch (error) {
      console.error("Error al verificar estado de EUser:", error);
      return false;
    }
  }
}
