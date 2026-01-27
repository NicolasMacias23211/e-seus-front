import { type ClosingCode } from '../models/ClosingCode';
import { http, type ApiResponse, type PaginatedResponse } from "./http";


export class ClosingCodeService {
    private endPoint = "/closing-codes/"

    async getAll(): Promise<ApiResponse<PaginatedResponse<ClosingCode>>> {
        return await http.get<PaginatedResponse<ClosingCode>>(this.endPoint)
    }

    async create(closingCode: ClosingCode): Promise<ApiResponse<ClosingCode>> {
        return await http.post<ClosingCode>(this.endPoint, closingCode)
    }

    async update(closingCode: ClosingCode, id: number): Promise<ApiResponse<ClosingCode>> {
        return await http.put<ClosingCode>(`${this.endPoint+id}/`, closingCode)
    }
    
    async delete(id: number): Promise<ApiResponse<ClosingCode>> {
        return await http.delete<ClosingCode>(this.endPoint+id+"/")
    }
}
