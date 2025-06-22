import axios from 'axios';
import { ValidationError } from './error';
import type { FieldError } from './error';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
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
    // 401 에러 처리 (기존)
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken'); // 'token' -> 'accessToken'
      localStorage.removeItem('refreshToken'); // 추가
      localStorage.removeItem('tokenType'); // 필요 없으면 제거
      localStorage.removeItem('tokenExpiresAt'); // 필요 없으면 제거
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }
    
    // 400 validation 에러 처리 (새로 추가)
    if (error.response?.status === 400) {
      const errorData = error.response.data;
      
      // 스프링에서 보낸 validation 에러인지 확인
      if (errorData.errors && Array.isArray(errorData.errors)) {
        const fieldErrors: Record<string, string> = {};
        errorData.errors.forEach((err: FieldError) => {
          fieldErrors[err.field] = err.errorMessage;
        });
        
        // 커스텀 에러 객체 생성
      const validationError = new ValidationError('Validation Error', fieldErrors, error);
        
        return Promise.reject(validationError);
      }
    }
    return Promise.reject(error);
  }
); 