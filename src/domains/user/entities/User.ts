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
  nickname: string;
  provider?: 'google' | 'kakao' | 'local';
  createdAt?: string;
  updatedAt?: string;
}

export interface UserCredentials {
  loginId: string;
  password: string;
}

export interface UserRegistration {
  loginId: string;
  password: string;
  nickname: string;
  email: string;
}
