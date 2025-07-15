import { useState, useCallback } from 'react';
import { User, UserRegistration } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
import { LoginRequest, LoginResponse, SocialLoginResponse } from '../types/auth';

export const useAuth = (userRepository: UserRepository) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const checkAuth = useCallback(async () => {
    try {
      const currentUser = await userRepository.getCurrentUser();
      setUser(currentUser);
    } catch (err: any) {
      if (err.response?.status !== 401 && err.response?.status !== 403) {
        console.error('인증 상태 확인 중 예상치 못한 오류 발생:', err);
      }
      setUser(null); 
    } finally {
      setLoading(false);
    }
  }, [userRepository]);


  const login = useCallback(async (request: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      await userRepository.login(request);

      await checkAuth();

    } catch (err: any) {
      setUser(null); 

      let errorMessage = '알 수 없는 오류가 발생했습니다.';

      if (err.response && err.response.status) {
        const status = err.response.status;

        if (status === 500) {
          errorMessage = '아이디 또는 비밀번호가 올바르지 않거나, 서버에 문제가 발생했습니다.';
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      console.error('로그인 실패 응답:', err.response);
      setError(errorMessage); // 최종적으로 결정된 에러 메시지를 상태에 저장
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userRepository, checkAuth]);

  // 로그아웃
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await userRepository.logout();
    } catch (err) {
      console.error('Logout failed on server, proceeding with client-side logout', err);
    } finally {
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setLoading(false);
    }
  }, [userRepository]);


  const setAuth = useCallback((response: SocialLoginResponse) => {
    setUser(response.user);
  }, []);

  
  const register = useCallback(async (userData: UserRegistration) => {
    try {
      setLoading(true);
      setError(null);
      await userRepository.register(userData);
      await login({ loginId: userData.loginId, password: userData.password });
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userRepository, login]);

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