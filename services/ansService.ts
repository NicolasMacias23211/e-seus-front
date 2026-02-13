import { type ANS } from "../models/ANS";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class AnsService {
  private endpoint = "/ans/";

  async getAll(
    page?: number,
    pageSize?: number,
  ): Promise<ApiResponse<PaginatedResponse<ANS>>> {
    const params = new URLSearchParams();
    if (page !== undefined) params.append("page", page.toString());
    if (pageSize !== undefined) params.append("page_size", pageSize.toString());

    const queryString = params.toString();
    const url = queryString ? `${this.endpoint}?${queryString}` : this.endpoint;

    return await http.get<PaginatedResponse<ANS>>(url);
  }

  async create(ans: ANS): Promise<ApiResponse<ANS>> {
    return await http.post<ANS>(this.endpoint, ans);
  }

  async update(ans: ANS, id: number): Promise<ApiResponse<ANS>> {
    return await http.put<ANS>(`${this.endpoint + id}/`, ans);
  }

  async delete(id: number): Promise<ApiResponse<ANS>> {
    return await http.delete<ANS>(this.endpoint + id + "/");
  }
}
