import { User } from "../entities/User";

export interface LoginResponse {
  refreshToken: string;
  expirationMs: number;
  user: User;
}

export interface SocialLoginResponse {
  expirationMs: number;
  user: User;
}

export interface LoginRequest {
  loginId: string;
  password: string;
}