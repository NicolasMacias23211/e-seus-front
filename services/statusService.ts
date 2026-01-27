import { type Status } from "../models/Status";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class StatusService {
  private endPoint = "/status/";

  async getAll(): Promise<ApiResponse<PaginatedResponse<Status>>> {
    return await http.get<PaginatedResponse<Status>>(this.endPoint);
  }

  async create(status: Status): Promise<ApiResponse<Status>> {
    return await http.post<Status>(this.endPoint, status);
  }

  async update(status: Status, id: number): Promise<ApiResponse<Status>> {
    return await http.put<Status>(`${this.endPoint + id}/`, status);
  }

  async delete(id: number): Promise<ApiResponse<Status>> {
    return await http.delete<Status>(this.endPoint + id + "/");
  }
}
