import { type Program } from "../models/Program";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class ProgramsService {
    private endPoint = "/programs/";

    async getAll(): Promise<ApiResponse<PaginatedResponse<Program>>> {
        return await http.get<PaginatedResponse<Program>>(this.endPoint)
    }
}