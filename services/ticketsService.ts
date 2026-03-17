import { http, type PaginatedResponse, type ApiResponse } from "./http";
import type {
  Ticket,
  TicketCreate,
  TicketShort,
  TicketUpdate,
  TicketList
} from "../models/Ticket";
import type { WeeklyStats } from "../models/Metricas";
import { SessionStorageService } from "./SessionStorageService";

const sessionStorage = new SessionStorageService();

export class TicketsService {
  private endpoint = "/tickets/";
  async GetTicketsByPerson(
    assigned_to: string,
  ): Promise<ApiResponse<PaginatedResponse<TicketShort>>> {
    return await http.get<PaginatedResponse<TicketShort>>(
      `/tickets/?assigned_to=${assigned_to}`,
    );
  }
  async getAllTicketsWithoutAssignment(page: number, pageSize: number, text: string = '', id_ans?: number | null, time_elapsed: string = '', before: boolean = false): Promise<ApiResponse<PaginatedResponse<TicketList>>> {
    if (before) {
      return await http.get<PaginatedResponse<TicketList>>(
        `${this.endpoint}?assigned_to__isnull=true&ticket_ans=${id_ans || ''}&create_at_before=${time_elapsed}&search=${text}&page=${page}&page_size=${pageSize}`
      );
    }
    return await http.get<PaginatedResponse<TicketList>>(
      `${this.endpoint}?assigned_to__isnull=true&ticket_ans=${id_ans || ''}&create_at_after=${time_elapsed}&search=${text}&page=${page}&page_size=${pageSize}`
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

  async getBacklogTickets(params?: {
    search?: string;
    ticket_id?: string;
  }): Promise<ApiResponse<PaginatedResponse<Ticket>>> {
    const userInfo = sessionStorage.getUserInfo();
    const networkUser = userInfo?.username;

    if (!networkUser) {
      throw new Error("Usuario no autenticado");
    }

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

  async create(ticket: TicketCreate): Promise<ApiResponse<Ticket>> {
    return await http.post<Ticket, TicketCreate>("/tickets/", ticket);
  }

  async updateTicketStatus(
    id_ticket: number,
    status_id: number,
  ): Promise<ApiResponse<Ticket>> {
    return await http.patch<Ticket, { status_id: number }>(
      `/tickets/${id_ticket}/`,
      { status_id },
    );
  }


  async patchTicket(ticketUpdate: TicketUpdate, id: number): Promise<ApiResponse<TicketUpdate>> {
    return await http.patch<TicketUpdate>(`${this.endpoint + id}/`, ticketUpdate)
  }

  async updateTicket(
    id_ticket: number,
    data: TicketUpdate,
  ): Promise<ApiResponse<Ticket>> {
    return await http.patch<Ticket, TicketUpdate>(
      `/tickets/${id_ticket}/`,
      data,
    );
  }

  async getTicketById(id_ticket: number): Promise<ApiResponse<Ticket>> {
    return await http.get<Ticket>(`/tickets/${id_ticket}/`);
  }

  async getWeeklyStats(): Promise<ApiResponse<WeeklyStats>> {
    return await http.get<WeeklyStats>("/tickets/weekly-stats/");
  }
}
