import { type ANS } from "../models/ANS";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class AnsService {
  private endPoint = "/ans/";

  async getAll(): Promise<ApiResponse<PaginatedResponse<ANS>>> {
    return await http.get<PaginatedResponse<ANS>>(this.endPoint);
  }

  async getAllPaginated(
    page: number,
    pageSize: number,
  ): Promise<ApiResponse<PaginatedResponse<ANS>>> {
    return await http.get<PaginatedResponse<ANS>>(
      `${this.endPoint}?page=${page}&page_size=${pageSize}`,
    );
  }

  async create(ans: ANS): Promise<ApiResponse<ANS>> {
    return await http.post<ANS>(this.endPoint, ans);
  }

  async update(ans: ANS, id: number): Promise<ApiResponse<ANS>> {
    return await http.put<ANS>(`${this.endPoint + id}/`, ans);
  }

  async delete(id: number): Promise<ApiResponse<ANS>> {
    return await http.delete<ANS>(this.endPoint + id + "/");
  }
}
