export interface Note {
  id_note: number;
  note: string;
  visible_to_client: boolean;
  create_at: Date;
  update_at: Date | null;
  id_ticket: number;
  network_user: string;
}