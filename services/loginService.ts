import type {
  Login,
  UserInfo,
  EldapAuthResponse,
} from "../models/login";
import { http, HttpService } from "./http";
import { env } from "../config/env";
import { SessionStorageService } from "./SessionStorageService";

export class LoginService extends HttpService {
  private endPointElDap = env.eldapApiUrl;
  private AuthTokenELdap = env.EldapAuthToken;
  private sessionStorageService = new SessionStorageService();

  public async login(user: string, password: string): Promise<Login> {
    try {
      let eldapResponse: EldapAuthResponse;
      //para desarrollo en local
      if (env.isDevelopment) {
        eldapResponse = {
          success: true,
          message: "Autenticación exitosa (mock)",
          user: {
            username: env.EldapUser.user,
            full_name: env.EldapUser.full_name,
            email: env.EldapUser.mail,
            position: env.EldapUser.position,
            document: parseInt(env.EldapUser.document),
          },
        };
      } else {
        // En producción, se hace la llamada real a ELDAP
        eldapResponse = await this.getEldapLogin(user, password);
      }

      if (eldapResponse.success && eldapResponse.user) {
        const backendLoginResponse = await this.loginBack(eldapResponse.user);
        if (backendLoginResponse.success) {
          this.sessionStorageService.handleLogin(backendLoginResponse);
        }
        return backendLoginResponse;
      } else {
        throw new Error(
          eldapResponse.message || "Credenciales de usuario inválidas."
        );
      }
    } catch (error) {
      console.error("Error durante el proceso de login:", error);
      throw error;
    }
  }


  public async getEldapLogin(
    user: string,
    password: string
  ): Promise<EldapAuthResponse> {
      const headers: HeadersInit = {
      "Authorization": `Bearer ${this.AuthTokenELdap}`,
    };
    const formData = new FormData();
    formData.append("user", user);
    formData.append("password", password);

    const opciones: RequestInit = {
      method: "POST",
      body: formData,
      headers: headers
    };

    try {
      const response = await fetch(this.endPointElDap, opciones);

      if (!response.ok) {
        throw new Error(
          `Error del servidor ELDAP: ${response.status} ${response.statusText}`
        );
      }

      const data: EldapAuthResponse = await response.json();
      return data;
    } catch (error) {
      console.error("No se pudo conectar al servicio ELDAP:", error);
      throw error;
    }
  }

  public async loginBack(user: UserInfo): Promise<Login>{
    const backendPayload = {
      ldap: {
        user: user.username,
        full_name: user.full_name,
        position: user.position,
        mail: user.email,
        document: user.document.toString()
      }
    };
    let result =  await http.post<Login>(`/auth/login/`, backendPayload);
    if (!result.data) {
      throw new Error("No se recibió información de login del backend.");
    }
    return result.data;
  }
}
