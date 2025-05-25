import { User, UserCredentials, UserRegistration, LoginResponse } from '../../domains/user/entities/User';
import { UserRepository } from '../../domains/user/repositories/UserRepository';
import { api } from './api';

export class UserRepositoryImpl implements UserRepository {
  async login(credentials: UserCredentials): Promise<User> {
    const response = await api.post<LoginResponse>('/api/user/login', credentials);
    const { token, tokenType, expiresAt } = response.data;
    
    // 토큰을 로컬 스토리지에 저장
    localStorage.setItem('token', token);
    localStorage.setItem('tokenType', tokenType);
    localStorage.setItem('tokenExpiresAt', expiresAt.toString());
    
    // 현재 사용자 정보 조회
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('로그인 후 사용자 정보를 가져오는데 실패했습니다.');
    }
    return user;
  }

  async register(userData: UserRegistration): Promise<User> {
    await api.post('/api/user', userData);
    return this.login({ loginId: userData.loginId, password: userData.password });
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('tokenExpiresAt');
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get<User>('/api/user/me');
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async updateProfile(userId: number, data: Partial<User>): Promise<User> {
    const response = await api.patch<User>(`/api/user/${userId}`, data);
    return response.data;
  }

  async checkLoginIdExists(loginId: string): Promise<boolean> {
    const response = await api.get<boolean>(`/api/user/exists?loginId=${loginId}`);
    return response.data;
  }
} 