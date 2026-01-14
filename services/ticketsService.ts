import { http, type PaginatedResponse, type ApiResponse } from "./http";
import type { Ticket } from "../models/Ticket";

export class TicketsService {
  private endpoint = "/tickets";

  
  async GetTicketsByPerson(
    assigned_to: string
  ): Promise<ApiResponse<PaginatedResponse<Ticket[]>>> {
    return await http.get<PaginatedResponse<Ticket[]>>(
      `/tickets/?assigned_to=${assigned_to}`
    );
  }

  async GetTicketByReporter(reporter_user: string): Promise<PaginatedResponse<Ticket>> {
    const response = await http.get<PaginatedResponse<Ticket>>(
      `${this.endpoint}?reporter_user__network_user=${reporter_user}`
    );
    return response.data!;
  }

  getAllTicketsWithoutAssignment(): Promise<
    ApiResponse<PaginatedResponse<Ticket[]>>
  > {
    return http.get<PaginatedResponse<Ticket[]>>("/tickets");
  }
}
