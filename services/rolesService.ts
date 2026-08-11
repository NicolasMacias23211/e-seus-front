import { http, type ApiResponse, type PaginatedResponse } from "./http";
import type { Role } from "../models/Role";

export class RolesService {
  private endPoint = "/roles/";

  async getAll(): Promise<ApiResponse<PaginatedResponse<Role>>> {
    return await http.get<PaginatedResponse<Role>>(this.endPoint);
  }

  async getAllPaginated(
    page: number,
    pageSize: number,
  ): Promise<ApiResponse<PaginatedResponse<Role>>> {
    return await http.get<PaginatedResponse<Role>>(
      `${this.endPoint}?page=${page}&page_size=${pageSize}`,
    );
  }

  async create(rol: Role): Promise<ApiResponse<Role>> {
    return await http.post<Role>(this.endPoint, rol);
  }

  async update(rol: Role, id: number): Promise<ApiResponse<Role>> {
    return await http.put<Role>(`${this.endPoint + id}/`, rol);
  }

  async delete(rol: string): Promise<ApiResponse<Role>> {
    return await http.delete<Role>(this.endPoint + rol + "/");
  }
}
