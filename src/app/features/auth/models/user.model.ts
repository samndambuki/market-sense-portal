export interface User {
  id?: number;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'ANALYST' | 'VIEWER';
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
