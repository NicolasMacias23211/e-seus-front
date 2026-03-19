export interface Note {
  id_note: number;
  note: string;
  visible_to_client: boolean;
  create_at: string;
  update_at: string;
  id_ticket: number;
  network_user: string;
}

export interface RecentActivityItem {
  id_note: number;
  note_preview: string;
  id_ticket: number;
  ticket_title: string;
  network_user: string;
  full_name: string;
  create_at: string;
}

export interface RecentActivityResponse {
  success: boolean;
  data: RecentActivityItem[];
}
