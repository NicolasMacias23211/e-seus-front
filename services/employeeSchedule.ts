import { EmpoyeeSchedule } from './../models/EmployeeSchedule';
import { http, type ApiResponse, type PaginatedResponse } from "./http";


export class EmployeeScheduleService {
    private endPoint = "/employee-schedule/"

    async getAll(): Promise<ApiResponse<PaginatedResponse<EmpoyeeSchedule>>> {
        return await http.get<PaginatedResponse<EmpoyeeSchedule>>(this.endPoint)
    }

    async getAllPaginated(
        page: number,
        pageSize: number,
    ): Promise<ApiResponse<PaginatedResponse<EmpoyeeSchedule>>> {
        return await http.get<PaginatedResponse<EmpoyeeSchedule>>(
            `${this.endPoint}?page=${page}&page_size=${pageSize}`,
        );
    }

    async create(empoyeeSchedule: EmpoyeeSchedule): Promise<ApiResponse<EmpoyeeSchedule>> {
        return await http.post<EmpoyeeSchedule>(this.endPoint, empoyeeSchedule)
    }

    async update(empoyeeSchedule: EmpoyeeSchedule, id: number): Promise<ApiResponse<EmpoyeeSchedule>> {
        return await http.put<EmpoyeeSchedule>(`${this.endPoint + id}/`, empoyeeSchedule)
    }

    async delete(id: number): Promise<ApiResponse<EmpoyeeSchedule>> {
        return await http.delete<EmpoyeeSchedule>(this.endPoint + id + "/")
    }
}
