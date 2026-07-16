import { Novelties, NoveltiesFiltered, NoveltiesPatch } from './../models/Novelties';
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class NoveltiesService {
    private endPoint = "/novelties/"

    async getAllByStatus(status: string): Promise<ApiResponse<PaginatedResponse<Novelties>>> {
        return await http.get<PaginatedResponse<Novelties>>(
            `${this.endPoint}?&status=${status}`
        );
    }

    async getAllByLeaveType(leave_type: string, date: string): Promise<ApiResponse<PaginatedResponse<Novelties>>> {
        return await http.get<PaginatedResponse<Novelties>>(
            `${this.endPoint}?&leave_type=${leave_type}&current_date=${date}`
        );
    }

    async getAllFiltered(
        page: number,
        pageSize: number,
        filters?: NoveltiesFiltered
    ): Promise<ApiResponse<PaginatedResponse<Novelties>>> {
        return await http.get<PaginatedResponse<Novelties>>(
            `${this.endPoint}?e_user=${filters?.e_user || ''}&status=${filters?.status || 'pendiente'}&leave_type=${filters?.leave_type || ''}&start_date=${filters?.start_date || ''}&end_date=${filters?.end_date || ''}&page=${page}&page_size=${pageSize}`
        );
    }

    async create(novelties: Novelties): Promise<ApiResponse<Novelties>> {
        return await http.post<Novelties>(this.endPoint, novelties)
    }

    async update(novelties: Novelties, id: number): Promise<ApiResponse<Novelties>> {
        return await http.put<Novelties>(`${this.endPoint + id}/`, novelties)
    }

    async patch(novelties: NoveltiesPatch, id: number): Promise<ApiResponse<NoveltiesPatch>> {
        return await http.patch<NoveltiesPatch>(`${this.endPoint + id}/`, novelties)
    }

    async delete(id: number): Promise<ApiResponse<Novelties>> {
        return await http.delete<Novelties>(this.endPoint + id + "/")
    }
}
