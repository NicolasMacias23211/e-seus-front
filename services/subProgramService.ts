import { type SubProgram } from "../models/SubProgram";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class SubProgramsService {
    private endPoint = "/subprograms/";

    async getAll(): Promise<ApiResponse<PaginatedResponse<SubProgram>>> {
        return await http.get<PaginatedResponse<SubProgram>>(this.endPoint)
    }
}