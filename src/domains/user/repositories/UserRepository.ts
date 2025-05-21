import { User, UserCredentials, UserRegistration } from '../entities/User';

export interface UserRepository {
  login(credentials: UserCredentials): Promise<User>;
  register(userData: UserRegistration): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  updateProfile(userId: number, data: Partial<User>): Promise<User>;
} 