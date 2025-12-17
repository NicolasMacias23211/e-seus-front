import { env } from "../config/env";
import {SessionStorageService} from "./SessionStorageService";

interface RequestOptions extends RequestInit {
  timeout?: number;
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

  constructor() {
    this.baseUrl = env.apiBaseUrl;
    this.defaultTimeout = env.apiTimeout;
  }

  private getDefaultHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    //este ejemplo es copn Bearer definir que vamos a usar en la aplciacion real JWT? Bearer, Basic, etc.
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY2MDEzMTQ1LCJpYXQiOjE3NjYwMDIzNDUsImp0aSI6ImRjMTczYzBhNzRhMzRjOTdiN2M3YzdmZDFlMGRhNjRiIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJzamltZWhlciIsImVtYWlsIjoic2ppbWVoZXJAZW10ZWxjby5jb20uY28iLCJmdWxsX25hbWUiOiJTRUJBU1RJQU4gQ0FNSUxPIEpJTUVORVogSEVSTkFOREVaIiwicG9zaXRpb24iOiJBUlFVSVRFQ1RPIERFIEFWQSIsImRvY3VtZW50IjoiMTAxNzI2MzA0MyJ9.dRnHSbLBCWFvbybwyiKxFcXc28ejJsa01L1nOjWmNzA";
    // const token = sessionStorageService.getAccessToken();
    // const sessionStorageService = new SessionStorageService();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  /**
   * Realiza una petición HTTP con timeout
   */
  protected async fetchWithTimeout(
    url: string,
    options: RequestOptions = {}
  ): Promise<Response> {
    const { timeout = this.defaultTimeout, ...fetchOptions } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          ...this.getDefaultHeaders(),
          ...fetchOptions.headers,
        },
      });

      clearTimeout(timeoutId);

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
  async post<T>(
    endpoint: string,
    data?: T,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
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
  async put<T>(
    endpoint: string,
    data?: T,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
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
  async patch<T>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
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

// Exportar instancia única del servicio
export const http = new HttpService();
