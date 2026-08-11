import { type SubProgram } from "../models/SubProgram";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class SubProgramsService {
  private endPoint = "/sub-programs/";

  async getAll(): Promise<ApiResponse<PaginatedResponse<SubProgram>>> {
          return await http.get<PaginatedResponse<SubProgram>>(this.endPoint)
  }
  async getAllPaginated(
      page: number,
      pageSize: number,
  ): Promise<ApiResponse<PaginatedResponse<SubProgram>>> {
      return await http.get<PaginatedResponse<SubProgram>>(
          `${this.endPoint}?page=${page}&page_size=${pageSize}`,
      );
  }
  
  async create(sub_program: SubProgram): Promise<ApiResponse<SubProgram>> {
      return await http.post<SubProgram>(this.endPoint, sub_program);
    }
  
  async update(sub_program: SubProgram, client_name: string): Promise<ApiResponse<SubProgram>> {
    return await http.put<SubProgram>(`${this.endPoint + sub_program}/`, sub_program);
  }
  async delete(sub_program: string): Promise<ApiResponse<SubProgram>> {
    return await http.delete<SubProgram>(this.endPoint + sub_program + "/");
  }
}
