import { EmployeeSchedule } from './../models/EmployeeSchedule';
import { http, type ApiResponse, type PaginatedResponse } from "./http";


export class EmployeeScheduleService {
    private endPoint = "/employee-schedule/"

    async getAll(): Promise<ApiResponse<PaginatedResponse<EmployeeSchedule>>> {
        return await http.get<PaginatedResponse<EmployeeSchedule>>(this.endPoint)
    }

    async getAllPaginated(
        page: number,
        pageSize: number,
    ): Promise<ApiResponse<PaginatedResponse<EmployeeSchedule>>> {
        return await http.get<PaginatedResponse<EmployeeSchedule>>(
            `${this.endPoint}?page=${page}&page_size=${pageSize}`,
        );
    }

    async create(EmployeeSchedule: EmployeeSchedule): Promise<ApiResponse<EmployeeSchedule>> {
        return await http.post<EmployeeSchedule>(this.endPoint, EmployeeSchedule)
    }

    async update(EmployeeSchedule: EmployeeSchedule, id: number): Promise<ApiResponse<EmployeeSchedule>> {
        return await http.put<EmployeeSchedule>(`${this.endPoint + id}/`, EmployeeSchedule)
    }

    async delete(id: number): Promise<ApiResponse<EmployeeSchedule>> {
        return await http.delete<EmployeeSchedule>(this.endPoint + id + "/")
    }
}
