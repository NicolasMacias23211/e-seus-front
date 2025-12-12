export interface EUser {
  networkUser: string;
  name: string;
  middleName: string | null;
  lastName: string;
  secondLastName: string | null;
  email: string | null;
  phone: string | null;
  userClientName: string;
  idServices: number;
  rolName: string;
}
