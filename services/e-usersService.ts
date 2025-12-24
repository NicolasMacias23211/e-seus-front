import { http, type ApiResponse, type PaginatedResponse } from "./http";
import type { EUser } from "../models/EUser";

export class eUsersService {
  async GetEUsersByNetworkUser(
    networkUser: string
  ): Promise<ApiResponse<EUser>> {
    return await http.get<EUser>(`/eusers/${networkUser}/`);
  }

  async GetAllEUsers(): Promise<ApiResponse<PaginatedResponse<EUser[]>>> {
    return await http.get<PaginatedResponse<EUser[]>>(`/eusers/`);
  }
}
