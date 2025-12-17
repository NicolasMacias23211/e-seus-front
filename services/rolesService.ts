import { http, type ApiResponse, type PaginatedResponse } from "./http";
import type { Role } from "../models/Role";

export class RolesService {
  private endpoint = "/roles";

  async getAll(): Promise<ApiResponse<PaginatedResponse<Role>>> {
    return await http.get<PaginatedResponse<Role>>(this.endpoint);
  }
}
