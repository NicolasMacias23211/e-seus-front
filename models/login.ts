export interface Login {
  success: Boolean;
  message: String;
  user: UserInfo;
  tokens: Tokens;
}

export interface UserInfo {
  username: string;
  full_name: string;
  email: string;
  position: string;
  document: number;
}

export interface Tokens {
  refresh: string;
  access: string;
}

export interface EldapAuthResponse {
  success: boolean;
  message: string;
  user?: UserInfo;
}