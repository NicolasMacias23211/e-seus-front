export interface ReportedTime {
  id_reported_times: number;
  date_reported: string;
  reported_time: string; // TIME from MySQL as string (HH:MM:SS)
  create_at: string;
  update_at: string;
  id_ticket: number;
  network_user: string;
}
