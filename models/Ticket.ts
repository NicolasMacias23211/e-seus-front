// Interfaz que coincide con la respuesta del backend
export interface Ticket {
  id_ticket: number;
  ticket_title: string;
  service_name: string;
  priority_name: string;
  status_name: string;
  reporter_user_name: string;
  assigned_to: string | null;
  create_at: string;
  estimated_closing_date: string | null;
  ticket_description?: string;
  ticket_attachments?: string | null;
  ticket_closing_code?: number | null;
  ticket_ans?: number | string | null;
  update_at?: string | null;
  closing_date?: string | null;
  sub_program_name?: string;
}
