import { type Program } from "../models/Program";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class ProgramsService {
  private endPoint = "/programs/";

  async getAll(): Promise<ApiResponse<PaginatedResponse<Program>>> {
    return await http.get<PaginatedResponse<Program>>(this.endPoint);
  }

  async create(program: Program): Promise<ApiResponse<Program>> {
    return await http.post<Program>(this.endPoint, program);
  }

  async update(program: Program, id: number): Promise<ApiResponse<Program>> {
    return await http.put<Program>(`${this.endPoint + id}/`, program);
  }

  async delete(id: number): Promise<ApiResponse<Program>> {
    return await http.delete<Program>(this.endPoint + id + "/");
  }
}
