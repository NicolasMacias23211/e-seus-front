import { type WorkingHours } from '../models/WorkingHours';
import { http, type ApiResponse, type PaginatedResponse } from "./http";


export class WorkingHoursService {
    private endPoint = "/working-hours/"

    async getAll(): Promise<ApiResponse<PaginatedResponse<WorkingHours>>> {
        return await http.get<PaginatedResponse<WorkingHours>>(this.endPoint)
    }

    async create(workingHours: WorkingHours): Promise<ApiResponse<WorkingHours>> {
        return await http.post<WorkingHours>(this.endPoint, workingHours)
    }

    async update(workingHours: WorkingHours, id: number): Promise<ApiResponse<WorkingHours>> {
        return await http.put<WorkingHours>(`${this.endPoint+id}/`, workingHours)
    }
    
    async delete(id: number): Promise<ApiResponse<WorkingHours>> {
        return await http.delete<WorkingHours>(this.endPoint+id+"/")
    }
}
