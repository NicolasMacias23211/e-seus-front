import { type SubProgram } from "../models/SubProgram";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class SubProgramsService {
  private endPoint = "/subprograms/";

  async getAll(): Promise<ApiResponse<PaginatedResponse<SubProgram>>> {
    return await http.get<PaginatedResponse<SubProgram>>(this.endPoint);
  }

  async create(subProgram: SubProgram): Promise<ApiResponse<SubProgram>> {
    return await http.post<SubProgram>(this.endPoint, subProgram);
  }

  async update(
    subProgram: SubProgram,
    id: number,
  ): Promise<ApiResponse<SubProgram>> {
    return await http.put<SubProgram>(`${this.endPoint + id}/`, subProgram);
  }

  async delete(id: number): Promise<ApiResponse<SubProgram>> {
    return await http.delete<SubProgram>(this.endPoint + id + "/");
  }
}
