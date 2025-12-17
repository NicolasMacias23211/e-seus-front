import { ClosingCode } from "../models/ClosingCode";
import { http, type ApiResponse, type PaginatedResponse } from "./http";


export class ClosingCodeService {
    private endPoint = "/closing-codes"

    async getAll(): Promise<ApiResponse<PaginatedResponse<ClosingCode>>> {
        return await http.get<PaginatedResponse<ClosingCode>>(this.endPoint)
    }
}
