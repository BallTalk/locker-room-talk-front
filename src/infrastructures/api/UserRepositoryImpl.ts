import { User, UserCredentials, UserRegistration } from '../../domains/user/entities/User';
import { UserRepository } from '../../domains/user/repositories/UserRepository';

export class UserRepositoryImpl implements UserRepository {
  private readonly API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  async login(credentials: UserCredentials): Promise<User> {
    const response = await fetch(`${this.API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.');
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

    return response.json();
  }

  async logout(): Promise<void> {
    const response = await fetch(`${this.API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('로그아웃에 실패했습니다.');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch(`${this.API_URL}/api/auth/me`, {
        credentials: 'include',
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
    const response = await fetch(`${this.API_URL}/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('프로필 업데이트에 실패했습니다.');
    }

    return response.json();
  }
} 