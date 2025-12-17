import type { Login, UserInfo, Tokens } from "../models/login";

export class SessionStorageService {

  public getItem<T>(key: string): T | null {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`Error al obtener el item ${key} de sessionStorage`, error);
      return null;
    }
  }

  public setItem<T>(key: string, value: T): void {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error al guardar el item ${key} en sessionStorage`, error);
    }
  }

  public removeItem(key: string): void {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error al eliminar el item ${key} de sessionStorage`, error);
    }
  }


  public handleLogin(loginData: Login): void {
    if (loginData.success) {
      this.setAuthTokens(loginData.tokens);
      this.setUserInfo(loginData.user);
    } else {
      console.error("El inicio de sesión no fue exitoso:", loginData.message);
    }
  }

  public handleLogout(): void {
    this.clearAuthTokens();
    this.clearUserInfo();
  }

  private setAuthTokens(tokens: Tokens): void {
    this.setItem('authTokens', tokens);
  }

  public getAuthTokens(): Tokens | null {
    return this.getItem<Tokens>('authTokens');
  }


  public getAccessToken(): string | null {
    const tokens = this.getAuthTokens();
    return tokens ? tokens.access : null;
  }


  public getRefreshToken(): string | null {
    const tokens = this.getAuthTokens();
    return tokens ? tokens.refresh : null;
  }

  private clearAuthTokens(): void {
    this.removeItem('authTokens');
  }

  private setUserInfo(user: UserInfo): void {
    this.setItem('userInfo', user);
  }


  public getUserInfo(): UserInfo | null {
    return this.getItem<UserInfo>('userInfo');
  }

  private clearUserInfo(): void {
    this.removeItem('userInfo');
  }

  public async refreshToken(): Promise<Tokens | null> {
    const currentRefreshToken = this.getRefreshToken();

    if (!currentRefreshToken) {
      console.log('No hay token de refresco disponible.');
      return null;
    }

    console.log('Refrescando el token de acceso...');
    
    const simulateApiCall = new Promise<Tokens>((resolve) => {
      setTimeout(() => {
        const newTokens: Tokens = {
          access: 'nuevo-token-de-acceso-refrescado-' + Date.now(),
          refresh: currentRefreshToken, 
        };
        resolve(newTokens);
      }, 1000);
    });

    try {
      const newTokens = await simulateApiCall;
      this.setAuthTokens(newTokens);
      console.log('Token refrescado y guardado exitosamente.');
      return newTokens;
    } catch (error) {
      console.error('Error al refrescar el token', error);
      this.handleLogout(); 
      return null;
    }
  }
}