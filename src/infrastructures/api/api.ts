import axios from 'axios';
import { ValidationError } from './error';
import type { FieldError } from './error';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401, 403 모두 인증 관련 에러로 처리
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // 현재 페이지가 로그인 페이지가 아닐 때만 리다이렉트
      if (!window.location.pathname.includes('/auth/login')) {
        window.location.href = '/auth/login';
      }
      return Promise.reject(error);
    }
    
    // 500 에러도 인증 관련일 수 있으니 체크
    if (error.response?.status === 500 && error.config?.url?.includes('/user/me')) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      return Promise.reject(error);
    }
    
    // 400 validation 에러 처리
    if (error.response?.status === 400) {
      const errorData = error.response.data;
      
      if (errorData.errors && Array.isArray(errorData.errors)) {
        const fieldErrors: Record<string, string> = {};
        errorData.errors.forEach((err: FieldError) => {
          fieldErrors[err.field] = err.errorMessage;
        });
        
        const validationError = new ValidationError('Validation Error', fieldErrors, error);
        return Promise.reject(validationError);
      }
    }
    return Promise.reject(error);
  }
); 