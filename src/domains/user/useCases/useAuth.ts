import { useState, useCallback } from 'react';
import { User, UserRegistration } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { LoginRequest, LoginResponse, SocialLoginResponse } from '../types/auth';

export const useAuth = (userRepository: UserRepository) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (request: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await userRepository.login(request);
      setUser(response.user);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userRepository]);

  const setAuth = useCallback((response: LoginResponse | SocialLoginResponse) => {
    setUser(response.user);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await userRepository.logout();
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그아웃에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userRepository]);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setUser(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const currentUser = await userRepository.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : '인증 확인에 실패했습니다.');
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } finally {
      setLoading(false);
    }
  }, [userRepository]);

  const register = useCallback(async (userData: UserRegistration) => {
    try {
      setLoading(true);
      setError(null);
      const registeredUser = await userRepository.register(userData);
      setUser(registeredUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userRepository]);

  return {
    user,
    loading,
    error,
    login,
    setAuth,
    logout,
    checkAuth,
    register
  };
}; 