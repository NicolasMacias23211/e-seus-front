import { http, type ApiResponse, type PaginatedResponse } from "./http";
import type { Status } from "../models/Status";

export class StatusService {
  private endpoint = "/status/";

  async getAll(): Promise<ApiResponse<PaginatedResponse<Status[]>>> {
    return await http.get<PaginatedResponse<Status[]>>(this.endpoint);
  }

  async getById(id: number): Promise<ApiResponse<Status>> {
    return await http.get<Status>(`${this.endpoint}${id}/`);
  }

  async create(status: Status): Promise<ApiResponse<Status>> {
    return await http.post<Status>(this.endpoint, status);
  }

  async update(status: Status, id: number): Promise<ApiResponse<Status>> {
    return await http.put<Status>(`${this.endpoint + id}/`, status);
  }

  async delete(id: number): Promise<ApiResponse<Status>> {
    return await http.delete<Status>(this.endpoint + id + "/");
  }
}
