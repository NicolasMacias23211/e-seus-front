import { LeaveType  } from '../models/LeaveTypes';
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class LeaveTypesService {
    private endPoint = "/leave-types/"

    async getAll(): Promise<ApiResponse<PaginatedResponse<LeaveType>>> {
        return await http.get<PaginatedResponse<LeaveType>>(this.endPoint)
    }

    async getAllPaginated(
        page: number,
        pageSize: number,
    ): Promise<ApiResponse<PaginatedResponse<LeaveType>>> {
        return await http.get<PaginatedResponse<LeaveType>>(
            `${this.endPoint}?page=${page}&page_size=${pageSize}`,
        );
    }

    async create(leaveType: LeaveType): Promise<ApiResponse<LeaveType>> {
        return await http.post<LeaveType>(this.endPoint, leaveType)
    }

    async update(leaveType: LeaveType, id: string): Promise<ApiResponse<LeaveType>> {
        return await http.put<LeaveType>(`${this.endPoint + id}/`, leaveType)
    }

    async delete(id: string): Promise<ApiResponse<LeaveType>> {
        return await http.delete<LeaveType>(this.endPoint + id + "/")
    }
}
