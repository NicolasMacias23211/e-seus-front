import { http, type PaginatedResponse, type ApiResponse } from "./http";
import type { Note } from "../models/Notes";

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
    idTicket: number
  ): Promise<ApiResponse<PaginatedResponse<Note>>> {
    return await http.get<PaginatedResponse<Note>>(
      `/notes/?id_ticket=${idTicket}`
    );
  }

  async createNote(data: CreateNoteDto): Promise<ApiResponse<Note>> {
    return await http.post<Note, CreateNoteDto>(`/notes/`, data);
  }

  async updateNote(
    idNote: number,
    data: UpdateNoteDto
  ): Promise<ApiResponse<Note>> {
    return await http.patch<Note, UpdateNoteDto>(`/notes/${idNote}/`, data);
  }

  async deleteNote(idNote: number): Promise<ApiResponse<void>> {
    return await http.delete<void>(`/notes/${idNote}/`);
  }
}
