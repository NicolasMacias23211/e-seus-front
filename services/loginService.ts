import type { Login, } from "../models/login";
import { HttpService } from "./http";
import { env } from "../config/env";
import { SessionStorageService } from "./SessionStorageService";
import { eUsersService } from "./e-usersService";
import { RolesService } from "./rolesService";

export class LoginService extends HttpService {
  private sessionStorageService = new SessionStorageService();
  private eUsersService = new eUsersService();
  private rolesService = new RolesService();

  public async login(user: string, password: string): Promise<Login> {
    try {
      const eldapResponse: Login = await this.getEldapLogin(user, password);

      if (eldapResponse.success && eldapResponse.user) {
        if (eldapResponse.success) {
          this.sessionStorageService.setItem(
            "authTokens",
            eldapResponse.tokens
          );
          const eUser = await this.eUsersService.GetEUsersByNetworkUser(
            eldapResponse.user.username
          );
          const isEUser = eUser.success && eUser.data != null;
          eldapResponse.user.isEUser = isEUser;
          eldapResponse.user.isAdmin = isEUser
            ? await this.resolveAdminStatus(eUser.data?.rol_name)
            : false;
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

  private async resolveAdminStatus(roleName?: string): Promise<boolean> {
    if (!roleName) {
      return false;
    }

    try {
      const response = await this.rolesService.getByName(roleName);
      return response.success && response.data?.is_admin === true;
    } catch (error) {
      console.error("Error al verificar permisos del rol:", error);
      return false;
    }
  }
}
