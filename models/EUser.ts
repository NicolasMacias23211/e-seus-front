export interface EUser {
  network_user: string;
  name: string;
  middle_name: string | null;
  last_name: string;
  second_last_name: string | null;
  email: string | null;
  phone: string | null;
  user_client_name: string;
  id_services: number;
  rol_name: string;
}
