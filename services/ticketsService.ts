import { http, type PaginatedResponse, type ApiResponse } from "./http";
import type { Ticket } from "../models/Ticket";

export class TicketsService {
  async GetTicketsByPerson(
    assigned_to: string
  ): Promise<ApiResponse<PaginatedResponse<Ticket[]>>> {
    return await http.get<PaginatedResponse<Ticket[]>>(
      `/tickets/?assigned_to=${assigned_to}`
    );
  }

  getAllTicketsWithoutAssignment(): Promise<
    ApiResponse<PaginatedResponse<Ticket[]>>
  > {
    return http.get<PaginatedResponse<Ticket[]>>("/tickets");
  }
}
