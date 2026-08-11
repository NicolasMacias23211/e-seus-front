import { type SubProgram } from "../models/SubProgram";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class SubProgramsService {
    private endPoint = "/sub-programs/";

    // async getAll(): Promise<ApiResponse<PaginatedResponse<SubProgram>>> {
    //     return await http.get<PaginatedResponse<SubProgram>>(this.endPoint)
    // }

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
    
    async create(subProgram: SubProgram): Promise<ApiResponse<SubProgram>> {
        return await http.post<SubProgram>(this.endPoint, subProgram);
      }
    
    async update(subProgram: SubProgram, sub_program: string): Promise<ApiResponse<SubProgram>> {
      return await http.put<SubProgram>(`${this.endPoint + sub_program}/`, subProgram);
    }

    async delete(sub_program: string): Promise<ApiResponse<SubProgram>> {
      return await http.delete<SubProgram>(this.endPoint + sub_program + "/");
    }
}