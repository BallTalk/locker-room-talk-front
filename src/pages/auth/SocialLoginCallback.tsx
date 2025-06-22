import React, { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const SocialLoginCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthContext();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');
    const userId = params.get('userId');
    const loginId = params.get('loginId');
    const nickname = params.get('nickname');

    if (accessToken && userId && loginId && nickname) {
      setAuth({
        accessToken,
        refreshToken: '', // 필요하면 추가
        user: {
          id: Number(userId),
          loginId,
          nickname,
          email: '', // 필요하면 백엔드에서 추가
        }
      });
      navigate('/'); // 메인으로 이동
    } else {
      navigate('/auth/login');
    }
  }, [location, setAuth, navigate]);

  return <div>소셜 로그인 처리 중...</div>;
};

export default SocialLoginCallback;