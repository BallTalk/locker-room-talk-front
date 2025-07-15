import axios from 'axios';
import { ValidationError } from './error';
import type { FieldError } from './error';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 응답 인터셉터만 남기기
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 인증 에러시 로그인 페이지로 리다이렉트만
    if (error.response?.status === 401 || error.response?.status === 403) {
      if (!window.location.pathname.includes('/auth/login')) {
        window.location.href = '/auth/login';
      }
      return Promise.reject(error);
    }
    
    // validation 에러 처리
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
