import { type TicketPriority } from "../models/TicketPriority";
import { http, type ApiResponse, type PaginatedResponse } from "./http";

export class TicketPriorityService {
    private endPoint = "/priorities/";

    async getAll(): Promise<ApiResponse<PaginatedResponse<TicketPriority>>> {
        return await http.get<PaginatedResponse<TicketPriority>>(this.endPoint);
    }

    async create(ticketPriority: TicketPriority): Promise<ApiResponse<TicketPriority>> {
        return await http.post<TicketPriority>(this.endPoint, ticketPriority);
    }

    async update(ticketPriority: TicketPriority, id: string): Promise<ApiResponse<TicketPriority>> {
        return await http.put<TicketPriority>(`${this.endPoint + id}/`, ticketPriority);
    }

    async delete(id: string): Promise<ApiResponse<TicketPriority>> {
        return await http.delete<TicketPriority>(this.endPoint + id + "/");
    }
}