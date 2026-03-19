import { http, type PaginatedResponse, type ApiResponse } from "./http";
import type {
  Note,
  RecentActivityItem,
  RecentActivityResponse,
} from "../models/Notes";
import { SessionStorageService } from "./SessionStorageService";

const sessionStorage = new SessionStorageService();

interface CreateNoteDto {
  note: string;
  visible_to_client: boolean;
  id_ticket: number;
  network_user: string;
}

interface UpdateNoteDto {
  note?: string;
  visible_to_client?: boolean;
  id_ticket?: number;
}

export class NotesService {
  async getNotesByTicket(
    idTicket: number,
  ): Promise<ApiResponse<PaginatedResponse<Note>>> {
    return await http.get<PaginatedResponse<Note>>(
      `/notes/?id_ticket=${idTicket}`,
    );
  }

  async createNote(data: CreateNoteDto): Promise<ApiResponse<Note>> {
    return await http.post<Note, CreateNoteDto>(`/notes/`, data);
  }

  async updateNote(
    idNote: number,
    data: UpdateNoteDto,
  ): Promise<ApiResponse<Note>> {
    return await http.patch<Note, UpdateNoteDto>(`/notes/${idNote}/`, data);
  }

  async deleteNote(idNote: number): Promise<ApiResponse<void>> {
    return await http.delete<void>(`/notes/${idNote}/`);
  }

  async getRecentActivity(
    limit: number = 5,
  ): Promise<ApiResponse<RecentActivityResponse>> {
    const username = sessionStorage.getUserInfo()?.username;
    return await http.get<RecentActivityResponse>(
      `/notes/recent-activity/?assigned_to=${username}&limit=${limit}`,
    );
  }
}
