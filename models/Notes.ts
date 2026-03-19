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
  /** PK de la nota */
  id_note: number;
  /** Primeros ~100 caracteres del comentario */
  note_preview: string;
  /** ID del ticket al que pertenece el comentario */
  id_ticket: number;
  /** Título del ticket */
  ticket_title: string;
  /** Username de quien escribió el comentario */
  network_user: string;
  /** Nombre completo de quien escribió el comentario */
  full_name: string;
  /** Fecha y hora ISO de creación del comentario */
  create_at: string;
}

export interface RecentActivityResponse {
  success: boolean;
  data: RecentActivityItem[];
}
