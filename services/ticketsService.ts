import { type Ticket } from "../models/Ticket";
import { http, type PaginatedResponse, type ApiResponse } from "./http";

export class TicketsService {
  private endpoint = "/tickets/";

  async GetTicketsByPerson( assigned_to: string): Promise<ApiResponse<PaginatedResponse<Ticket[]>>> {
    return await http.get<PaginatedResponse<Ticket[]>>(
      `${this.endpoint}?assigned_to=${assigned_to}`
    );
  }

  async create(ticket: Ticket): Promise<ApiResponse<Ticket>> {
    return await http.post<Ticket>(this.endpoint, ticket);
  }

  async getTicketById(id: number): Promise<ApiResponse<Ticket>> {
    return await http.get<Ticket>(`${this.endpoint}${id}/`);
  }

  async update(ticket: Ticket, id: number): Promise<ApiResponse<Ticket>> {
    return await http.put<Ticket>(`${this.endpoint}${id}/`, ticket);
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    return await http.delete<void>(`${this.endpoint}${id}/`);
  }
}
