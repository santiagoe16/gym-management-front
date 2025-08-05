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
    gym_id: number;
  };
}

export interface UserAutenticate {
  id: number;
  name: string;
  email: string;
  role: string;
  gym_id: number;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}