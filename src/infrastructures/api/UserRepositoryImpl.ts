import { User, UserRegistration } from '../../domains/user/entities/User';
import { UserRepository } from '../../domains/user/repositories/UserRepository';
import { LoginRequest, LoginResponse, SocialLoginResponse } from '../../domains/user/types/auth';

export class UserRepositoryImpl implements UserRepository {
  private readonly API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.');
    }

    return response.json();
  }

  async handleSocialLoginCallback(provider: 'google' | 'kakao', code: string): Promise<SocialLoginResponse> {
    const response = await fetch(`${this.API_URL}/api/auth/${provider}/callback?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('소셜 로그인에 실패했습니다.');
    }

    return response.json();
  }

  async register(userData: UserRegistration): Promise<User> {
    const response = await fetch(`${this.API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('회원가입에 실패했습니다.');
    }

    const loginResponse = await this.login({
      loginId: userData.loginId,
      password: userData.password,
    });

    return loginResponse.user;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch(`${this.API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      return response.json();
    } catch (error) {
      return null;
    }
  }

  async updateProfile(userId: number, data: Partial<User>): Promise<User> {
    const response = await fetch(`${this.API_URL}/api/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('프로필 업데이트에 실패했습니다.');
    }

    return response.json();
  }

  async checkLoginIdExists(loginId: string): Promise<boolean> {
    const response = await fetch(`${this.API_URL}/api/user/exists?loginId=${loginId}`);
    return response.json();
  }
} 