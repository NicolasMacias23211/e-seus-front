export interface EUser {
  network_user: string;
  name: string;
  middle_name: string | null;
  last_name: string;
  second_last_name: string | null;
  email: string | null;
  phone: string | null;
  rol_name: string;
  user_client_name?: string | null;
  id_services?: number | null;
}
