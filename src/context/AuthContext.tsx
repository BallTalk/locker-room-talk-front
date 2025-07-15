// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { useAuth } from '../domains/user/useCases/useAuth';
import { UserRepositoryImpl } from '../infrastructures/api/UserRepositoryImpl';
import { User, UserRegistration } from '../domains/user/entities/User';
import { LoginRequest, LoginResponse, SocialLoginResponse } from '../domains/user/types/auth';

// AuthContext에서 제공할 값 타입 정의
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (request: LoginRequest) => Promise<void>;
  setAuth: (response: LoginResponse | SocialLoginResponse) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  register: (userData: UserRegistration) => Promise<void>;
}

const userRepository = new UserRepositoryImpl();

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth(userRepository);

  useEffect(() => {
    auth.checkAuth();
  }, []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// 커스텀 훅
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
