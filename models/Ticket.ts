import type { Service } from "./Service";
import type { TicketPriority } from "./TicketPriority";
import type { ClosingCode } from "./ClosingCode";
import type { ANS } from "./ANS";
import type { Status } from "./Status";
import type { Note } from "./Notes";
import type { ReportedTime } from "./ReportedTime";

// Interfaz para el reporter (usuario externo)
export interface Reporter {
  network_user: string;
  mail: string;
  phone: string;
}

// Interfaz para el sub_program anidado
export interface TicketSubProgram {
  sub_program_name: string;
  program_name_display: string;
  program_name: string;
}

// Interfaz completa que coincide con la respuesta del backend
export interface Ticket {
  id_ticket: number;
  service: Service;
  priority: TicketPriority;
  closing_code: ClosingCode | null;
  ans: ANS;
  reporter: Reporter;
  status: Status;
  sub_program: TicketSubProgram;
  notes: Note[];
  reported_times: ReportedTime[];
  ticket_title: string;
  ticket_description: string;
  ticket_attachments: string | null;
  create_at: string;
  update_at: string;
  assigned_to: string | null;
  closing_date: string | null;
  estimated_closing_date: string | null;
  ticket_service: number;
  ticket_priority: string;
  ticket_closing_code: number | null;
  ticket_ans: number;
  reporter_user: string;
  status_id: number;
  sub_program_name: string;
}

// Interfaz simplificada para la creación de tickets
export interface TicketCreate {
  ticket_title: string;
  ticket_description: string;
  ticket_attachments?: string | null;
  ticket_service: number;
  ticket_priority: string;
  ticket_ans: number;
  reporter_user: string;
  sub_program_name: string;
  status_id: number;
  assigned_to?: string;
}
