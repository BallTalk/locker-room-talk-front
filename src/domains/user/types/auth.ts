export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    loginId: string;
    nickname: string;
    email: string;
  };
}

export type SocialProvider = 'google' | 'kakao';

export interface SocialLoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    loginId: string;
    nickname: string;
    email: string;
    provider: SocialProvider;
  };
} 