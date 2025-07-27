export interface LoginRequest {
  email: string;
  password: string;
  gym_id: number;
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
