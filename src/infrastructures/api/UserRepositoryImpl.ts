import { User, UserRegistration } from '../../domains/user/entities/User';
import { UserRepository } from '../../domains/user/repositories/UserRepository';
import { LoginRequest, LoginResponse, SocialLoginResponse } from '../../domains/user/types/auth';
import { api } from './api';

export class UserRepositoryImpl implements UserRepository {

  async login(request: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', request);
    console.log(response);
    console.log(localStorage);
    
    return response.data;
  }

  // 회원가입
  async register(userData: UserRegistration): Promise<User> {
    await api.post('/user', userData); // 회원가입 API는 201 Created만 반환
    
    // 백엔드가 회원가입 후 자동 로그인을 시켜주지 않으므로,
    // 프론트에서 다시 로그인 API를 호출해야 함.
    const loginResponse = await this.login({
      loginId: userData.loginId,
      password: userData.password,
    });
    return loginResponse.user;
  }


  // 로그아웃
  async logout(): Promise<void> {
    // 서버에 로그아웃 요청을 보내 토큰을 블랙리스트에 추가
    await api.post('/auth/logout');
    // 로컬의 토큰은 useAuth 훅에서 제거할 것임.
  }

  // 내 정보 가져오기 (토큰으로)
  async getCurrentUser(): Promise<User | null> {
    try {
      // 백엔드의 /api/user/me 응답 타입(MyProfileResponse)에 맞춰줘야 함
      // 여기서는 일단 User 타입과 호환된다고 가정.
      const response = await api.get<User>('/user/me');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      return null;
    }
  }

  // 프로필 업데이트
  async updateProfile(userId: number, data: Partial<User>): Promise<User> {
    // 백엔드 API는 loginId를 받지만, 여기서는 userId로 받았네.
    // 일관성을 위해 백엔드에 맞춰 loginId로 처리하거나, User 객체에서 loginId를 추출해야 함.
    // 일단은 /api/user/me를 호출한다고 가정하고 수정.
    const response = await api.patch<User>('/user/me', data);
    return response.data;
  }

  // 아이디 중복 확인
  async checkLoginIdExists(loginId: string): Promise<boolean> {
    const response = await api.get<boolean>('/user/exists', {
      params: { loginId },
    });
    return response.data;
  }
  
  async handleSocialLoginCallback(code: string): Promise<SocialLoginResponse> {
    const response = await api.post<SocialLoginResponse>('/auth/oauth2/callback', { code });
    console.log(response);
    
    return response.data;
  }
} 