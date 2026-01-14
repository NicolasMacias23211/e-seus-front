export interface Ticket {
  ticket_title: string;
  ticket_description: string;
  ticket_attachments: string | null;
  ticket_service: number | "";
  ticket_priority: string;
  ticket_ans: number | "";
  sub_program_name: string;
  reporter_user: string;
  status_id: number;
  estimated_closing_date: string | null;
  service_name: string;
  priority_name: string;
  reporter_user_name: string;
  client_name: string;
  program_name: string;
  status_name: string;
  assigned_to: string | null;
  create_at: string;
  id_ticket: number;
}
