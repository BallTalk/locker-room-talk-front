import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../domains/user/useCases/useAuth';
import { UserRepositoryImpl } from '../../infrastructures/api/UserRepositoryImpl';

const SocialLoginCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRepository = new UserRepositoryImpl();
  const { setAuth } = useAuth(userRepository);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const provider = searchParams.get('provider');

        if (!code || !provider) {
          throw new Error('인증 정보가 없습니다.');
        }

        const response = await userRepository.handleSocialLoginCallback(provider as 'google' | 'kakao', code);
        setAuth(response);
        
        // 팝업 창인 경우 부모 창을 새로고침하고 팝업을 닫습니다.
        if (window.opener) {
          window.opener.location.reload();
          window.close();
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('소셜 로그인 처리 중 오류 발생:', error);
        if (window.opener) {
          window.opener.location.href = '/auth/login';
          window.close();
        } else {
          navigate('/auth/login');
        }
      }
    };

    handleCallback();
  }, [location, navigate, setAuth]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <p>소셜 로그인 처리 중...</p>
    </div>
  );
};

export default SocialLoginCallback; 