import { type EUser } from "../models/EUser";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class eUsersService {
  private endPoint = "/eusers/";

  async GetEUsersByNetworkUser(
    networkUser: string
  ): Promise<ApiResponse<EUser>> {
    return await http.get<EUser>(`/eusers/${networkUser}/`);
  }

  async getAll(): Promise<ApiResponse<PaginatedResponse<EUser>>> {
    return await http.get<PaginatedResponse<EUser>>(this.endPoint);
  }

  async create(eUser: EUser): Promise<ApiResponse<EUser>> {
    return await http.post<EUser>(this.endPoint, eUser);
  }

  async update(eUser: EUser, id: string): Promise<ApiResponse<EUser>> {
    return await http.put<EUser>(`${this.endPoint + id}/`, eUser);
  }

  async delete(id: string): Promise<ApiResponse<EUser>> {
    return await http.delete<EUser>(this.endPoint + id + "/");
  }
}
