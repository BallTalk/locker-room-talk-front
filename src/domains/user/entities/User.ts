export enum Provider {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
  KAKAO = 'KAKAO'
}

export enum Status {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  BANNED = 'BANNED',
  WITHDRAWN = 'WITHDRAWN',
  DORMANT = 'DORMANT'
}

export interface User {
  id: number;
  loginId: string;
  provider: Provider;
  providerUserId?: string;
  nickname: string;
  favoriteTeamId: string;
  profileImageUrl?: string;
  statusMessage?: string;
  status: Status;
  lastLoginAt?: string;
  loginFailCount: number;
  deletedAt?: string;
}

export interface UserCredentials {
  loginId: string;
  password: string;
}

export interface UserRegistration {
  loginId: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  favoriteTeamId: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresAt: number;
} 