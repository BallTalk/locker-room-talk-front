import React, { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { UserRepositoryImpl } from '../../infrastructures/api/UserRepositoryImpl';

const SocialLoginCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthContext();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (!code) {
        navigate('/auth/login');
        return;
      }

      try {
        // UserRepository의 handleSocialLoginCallback 사용
        const userRepository = new UserRepositoryImpl();
        const response = await userRepository.handleSocialLoginCallback(code);
        
        setAuth(response);
        navigate('/');
      } catch (error) {
        console.error('Social login callback failed:', error);
        navigate('/auth/login');
      }
    };

    handleCallback();
  }, [location, setAuth, navigate]);

  return <div>소셜 로그인 처리 중...</div>;
};

export default SocialLoginCallback;