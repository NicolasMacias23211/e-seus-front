export interface ReportedTime {
  id_reported_times: number;
  date_reported: Date;
  reported_time: string; // TIME from MySQL as string (HH:MM:SS)
  id_ticket: number;
  create_at: Date;
  update_at: Date | null;
  network_user: string;
}
