import { useState } from 'react';
import { User, UserCredentials, UserRegistration } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

export const useAuth = (userRepository: UserRepository) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: UserCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const loggedInUser = await userRepository.login(credentials);
      setUser(loggedInUser);
    } catch (err) {
      setError('로그인에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: UserRegistration) => {
    try {
      setLoading(true);
      setError(null);
      const registeredUser = await userRepository.register(userData);
      setUser(registeredUser);
    } catch (err) {
      setError('회원가입에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await userRepository.logout();
      setUser(null);
    } catch (err) {
      setError('로그아웃에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    try {
      const currentUser = await userRepository.getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (err) {
      setUser(null);
      return null;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth
  };
}; 