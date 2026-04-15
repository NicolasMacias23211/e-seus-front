import { env } from "../config/env";
import { SessionStorageService } from "./SessionStorageService";

interface RequestOptions extends RequestInit {
  timeout?: number;
  skipAuth?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export class HttpService {
  private baseUrl: string;
  private defaultTimeout: number;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<boolean> | null = null;

  constructor() {
    this.baseUrl = env.apiBaseUrl;
    this.defaultTimeout = env.apiTimeout;
  }

  private getDefaultHeaders(skipAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (!skipAuth) {
      const sessionStorageService = new SessionStorageService();
      const token = sessionStorageService.getAccessToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise;
    }

    const sessionStorageService = new SessionStorageService();
    this.isRefreshing = true;
    this.refreshPromise = (async () => {
      try {
        const refreshToken = sessionStorageService.getRefreshToken();

        if (!refreshToken) {
          sessionStorageService.handleLogout();
          return false;
        }
        return await sessionStorageService.refreshToken(refreshToken);
      } catch (error) {
        sessionStorageService.handleLogout();
        return false;
      } finally {
        this.isRefreshing = false;
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  protected async fetchWithTimeout(
    url: string,
    options: RequestOptions = {}
  ): Promise<Response> {
    const {
      timeout = this.defaultTimeout,
      skipAuth = false,
      ...fetchOptions
    } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          ...this.getDefaultHeaders(skipAuth),
          ...fetchOptions.headers,
        },
      });

      clearTimeout(timeoutId);

      if (response.status === 401 && !skipAuth) {
        const refreshed = await this.refreshAccessToken();

        if (refreshed) {
          const retryController = new AbortController();
          const retryTimeoutId = setTimeout(
            () => retryController.abort(),
            timeout
          );

          try {
            const retryResponse = await fetch(url, {
              ...fetchOptions,
              signal: retryController.signal,
              headers: {
                ...this.getDefaultHeaders(skipAuth),
                ...fetchOptions.headers,
              },
            });

            clearTimeout(retryTimeoutId);

            if (!retryResponse.ok) {
              throw new Error(`HTTP error! status: ${retryResponse.status}`);
            }

            return retryResponse;
          } catch (retryError) {
            clearTimeout(retryTimeoutId);
            if (
              retryError instanceof Error &&
              retryError.name === "AbortError"
            ) {
              throw new Error("Request timeout");
            }
            throw retryError;
          }
        } else {
          throw new Error(
            "No se pudo refrescar el token. Por favor, inicie sesión nuevamente."
          );
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await this.fetchWithTimeout(url, {
        method: "GET",
        ...options,
      });
      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }

  /**
   * POST request
   */
  async post<TResponse, TBody = TResponse>(
    endpoint: string,
    data?: TBody,
    options?: RequestOptions
  ): Promise<ApiResponse<TResponse>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await this.fetchWithTimeout(url, {
        method: "POST",
        body: JSON.stringify(data),
        ...options,
      });
      const responseData = await response.json();
      return {
        success: true,
        data: responseData,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }

  /**
   * PUT request
   */
  async put<TResponse, TBody = TResponse>(
    endpoint: string,
    data?: TBody,
    options?: RequestOptions
  ): Promise<ApiResponse<TResponse>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await this.fetchWithTimeout(url, {
        method: "PUT",
        body: JSON.stringify(data),
        ...options,
      });
      const responseData = await response.json();
      return {
        success: true,
        data: responseData,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }

  /**
   * DELETE request
   */
  async delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await this.fetchWithTimeout(url, {
        method: "DELETE",
        ...options,
      });
      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }

  /**
   * PATCH request
   */
  async patch<TResponse, TBody = TResponse>(
    endpoint: string,
    data?: TBody,
    options?: RequestOptions
  ): Promise<ApiResponse<TResponse>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await this.fetchWithTimeout(url, {
        method: "PATCH",
        body: JSON.stringify(data),
        ...options,
      });
      const responseData = await response.json();
      return {
        success: true,
        data: responseData,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    }
  }
}

export const http = new HttpService();
