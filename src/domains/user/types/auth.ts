export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  token: string;        // 백엔드와 맞춤
  tokenType: string;    // 백엔드와 맞춤
  expirationMs: number; // 백엔드와 맞춤
  user: {
    id: number;
    loginId: string;
    nickname: string;
  };
}

export type SocialProvider = 'google' | 'kakao';

export interface SocialLoginResponse {
  token: string;        // 백엔드와 맞춤
  tokenType: string;    // 백엔드와 맞춤
  expirationMs: number; // 백엔드와 맞춤
  user: {
    id: number;
    loginId: string;
    nickname: string;
    provider: SocialProvider;
  };
} 