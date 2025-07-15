import { User, UserRegistration } from '../entities/User';
import { LoginRequest, LoginResponse, SocialLoginResponse } from '../types/auth';

export interface UserRepository {
  login(request: LoginRequest): Promise<LoginResponse>;
  handleSocialLoginCallback(code: string): Promise<SocialLoginResponse>; // 타입 수정
  register(userData: UserRegistration): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  updateProfile(userId: number, data: Partial<User>): Promise<User>;
}