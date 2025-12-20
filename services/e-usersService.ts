import { http, type ApiResponse } from "./http";
import type { EUser } from "../models/EUser";

export class eUsersService {
  async GetEUsersByPerson(networkUser: string): Promise<ApiResponse<EUser>> {
    return await http.get<EUser>(`/eusers/${networkUser}/`);
  }
}
