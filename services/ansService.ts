import { type ANS } from "../models/ANS";
import { http, type ApiResponse, type PaginatedResponse} from "./http";


export class AnsService {
  private endpoint = "/ans/";

  async getAll(): Promise<ApiResponse<PaginatedResponse<ANS>>> {
    return await http.get<PaginatedResponse<ANS>>(this.endpoint);
  }

  async create(ans: ANS): Promise<ApiResponse<ANS>> {
    return await http.post<ANS>(this.endpoint, ans);
  }

  async update(ans: ANS, id: number): Promise<ApiResponse<ANS>> {
    return await http.put<ANS>(`${this.endpoint+id}/`, ans);
  }
 
  async delete(id: number): Promise<ApiResponse<ANS>> {
    return await http.delete<ANS>(this.endpoint+id+"/")
  }
}


