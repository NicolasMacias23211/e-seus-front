import { http, type ApiResponse, type PaginatedResponse } from "./http";
import type { Status, StatusCrud } from "../models/Status";

export class StatusService {
  private endpoint = "/status/";

  async getAll(): Promise<ApiResponse<PaginatedResponse<Status[]>>> {
    return await http.get<PaginatedResponse<Status[]>>(this.endpoint);
  }

  async getAllPaginated(
    page: number,
    pageSize: number,
  ): Promise<ApiResponse<PaginatedResponse<Status>>> {
    return await http.get<PaginatedResponse<Status>>(
      `${this.endpoint}?page=${page}&page_size=${pageSize}`,
    );
  }

  async create(status: StatusCrud): Promise<ApiResponse<StatusCrud>> {
    return await http.post<StatusCrud>(this.endpoint, status);
  }

  async update(status: StatusCrud, id: number): Promise<ApiResponse<StatusCrud>> {
    return await http.put<StatusCrud>(`${this.endpoint + id}/`, status);
  }

  async delete(id: number): Promise<ApiResponse<Status>> {
    return await http.delete<Status>(this.endpoint + id + "/");
  }
}

