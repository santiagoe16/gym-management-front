export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    role: string;
    id: number;
    name: string;
    email: string;
  };
}
