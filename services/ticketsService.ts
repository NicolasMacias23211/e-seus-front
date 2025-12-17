import { http, type ApiResponse } from './http';
import type { Ticket } from "../models/Ticket";

export class TicketsService {
  async GetTicketsByPerson(
    assigned_to: string
  ): Promise<ApiResponse<Ticket[]>> {
    return await http.get<Ticket[]>(`/tickets/?assigned_to=${assigned_to}`);
  }

  getAllTicketsWithoutAssignment(): Promise<ApiResponse<Ticket[]>> {
    return http.get<Ticket[]>("/tickets");
  }
}
