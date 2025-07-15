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
  id: number; // User 식별자
  loginId: string;
  nickname: string;
  provider: Provider;
  favoriteTeam: string;
  profileImageUrl: string | null;
  statusMessage: string | null;
  status: Status;
}

export interface UserRegistration {
  loginId: string;
  password: string;
  nickname: string;
  phoneNumber: string;
}