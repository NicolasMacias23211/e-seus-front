import { http, type PaginatedResponse, type ApiResponse } from "./http";
import type { Ticket, TicketCreate } from "../models/Ticket";
import { SessionStorageService } from "./SessionStorageService";

const sessionStorage = new SessionStorageService();

export class TicketsService {
  private endpoint = "/tickets/";

  async GetTicketsByPerson(
    assigned_to: string,
  ): Promise<ApiResponse<PaginatedResponse<Ticket>>> {
    return await http.get<PaginatedResponse<Ticket>>(
      `/tickets/?assigned_to=${assigned_to}`,
    );
  }

  async GetTicketByReporter(
    reporter_user: string,
  ): Promise<PaginatedResponse<Ticket>> {
    const response = await http.get<PaginatedResponse<Ticket>>(
      `${this.endpoint}?reporter_user__network_user=${reporter_user}`,
    );
    return response.data!;
  }

  getAllTicketsWithoutAssignment(): Promise<
    ApiResponse<PaginatedResponse<Ticket>>
  > {
    return http.get<PaginatedResponse<Ticket>>("/tickets");
  }

  async getBacklogTickets(params?: {
    search?: string;
    ticket_id?: string;
  }): Promise<ApiResponse<PaginatedResponse<Ticket>>> {
    const userInfo = sessionStorage.getUserInfo();
    const networkUser = userInfo?.username;

    if (!networkUser) {
      throw new Error("Usuario no autenticado");
    }

    // Construir query params
    const queryParams = new URLSearchParams();
    queryParams.append("assigned_to", networkUser);

    if (params?.search) {
      queryParams.append("search", params.search);
    }

    if (params?.ticket_id) {
      queryParams.append("ticket_id", params.ticket_id);
    }

    return await http.get<PaginatedResponse<Ticket>>(
      `/tickets/backlog/?${queryParams.toString()}`,
    );
  }

  async create(ticket: Ticket): Promise<ApiResponse<Ticket>> {
    return await http.post<Ticket>(this.endpoint, ticket);
  }
}
