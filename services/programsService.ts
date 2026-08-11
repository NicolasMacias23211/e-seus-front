import { type Program } from "../models/Program";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class ProgramsService {
  private endPoint = "/programs/";

  async getAll(): Promise<ApiResponse<PaginatedResponse<Program>>> {
    return await http.get<PaginatedResponse<Program>>(this.endPoint);
  }

  async getAllPaginated(
    page: number,
    pageSize: number,
  ): Promise<ApiResponse<PaginatedResponse<Program>>> {
    return await http.get<PaginatedResponse<Program>>(
      `${this.endPoint}?page=${page}&page_size=${pageSize}`,
    );
  }

  async create(program: Program): Promise<ApiResponse<Program>> {
    return await http.post<Program>(this.endPoint, program);
  }

  async update(program: Program, program_name: string): Promise<ApiResponse<Program>> {
    return await http.put<Program>(`${this.endPoint + program_name}/`, program);
  }

  async delete(program_name: string): Promise<ApiResponse<Program>> {
    return await http.delete<Program>(this.endPoint + program_name + "/");
  }
}
