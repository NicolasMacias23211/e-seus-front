import type { Service } from "./Service";
import type { TicketPriority } from "./TicketPriority";
import type { ClosingCode } from "./ClosingCode";
import type { ANS } from "./ANS";
import type { Status } from "./Status";
import type { Note } from "./Notes";
import type { ReportedTime } from "./ReportedTime";
import type {SubProgram} from "./SubProgram"
import type { User } from "./User";

// Interfaz completa que coincide con la respuesta del backend
export interface Ticket {
  id_ticket: number;
  service: Service;
  priority: TicketPriority;
  closing_code: ClosingCode | null;
  ans: ANS;
  reporter: User;
  status: Status;
  sub_program: SubProgram;
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

export interface TicketShort {
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
