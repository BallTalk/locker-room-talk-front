import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'; 
import { theme } from '../../../styles/theme';
import MobileMenu from './MobileMenu';

import { useAuthContext } from '../../../context/AuthContext';

const HeaderContainer = styled.header`
  background: white;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  box-shadow: ${theme.shadows.leather};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${theme.colors.primary};
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const LogoImage = styled.img`
  height: 48px;
  width: auto;
  display: block;
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text.primary};
  text-decoration: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${theme.colors.primary};
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover {
    color: ${theme.colors.primary};
    
    &::after {
      width: 80%;
    }
  }
`;

const AuthButton = styled(Link)`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${theme.colors.primary};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: ${theme.colors.secondary};
    
    &::after {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  color: ${theme.colors.primary};
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.sm} ${theme.spacing.md};

  &:hover {
    color: ${theme.colors.secondary};
    background: ${theme.colors.background};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${theme.colors.primary};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, loading } = useAuthContext();
  const navigate = useNavigate();

  // /user/me 호출해서 응답을 콘솔에 찍는 함수
  const handleLogUserMe = async () => {
    try {
      const apiModule = await import('../../../infrastructures/api/api');
      const api = apiModule.api;
      // 실제 요청 URL 확인
      const url = api.defaults.baseURL + '/user/me';
      console.log('요청 URL:', url);
      const response = await api.get('/user/me');
      // 파싱 없이 전체 응답 콘솔에 출력
      console.log(response);
    } catch (error) {
      console.error('user/me 요청 실패:', error);
    }
  };

  const handleLogout = async () => {
    await logout(); // 상태만 변경하는 logout 함수 호출
    navigate('/'); // logout 함수가 끝나면 메인 페이지로 이동
  };

  return (
    <>
      {/* 기존 스타일 컴포넌트 그대로 */}
      <HeaderContainer>
        <HeaderContent>
          <Logo to="/">Locker Room Talk</Logo>
          <NavSection>
            <DesktopNav>
              <NavLink to="/posts">게시판</NavLink>
              <NavLink to="/teams">팀</NavLink>
              <NavLink to="/players">선수</NavLink>
            </DesktopNav>
            {/* 내 정보 콘솔로그 버튼 추가 */}
            <button onClick={handleLogUserMe} style={{ marginRight: 12, padding: '6px 12px', borderRadius: 6, border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer' }}>
              내 정보 콘솔로그
            </button>
            {!loading && (
              <>
                {user ? (
                  <>
                    <NavLink to="/mypage">{user.nickname}님</NavLink>
                    <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                  </>
                ) : (
                  <AuthButton as={Link} to="/auth/login">
                    로그인
                  </AuthButton>
                )}
              </>
            )}
          </NavSection>
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>☰</MobileMenuButton>
        </HeaderContent>
      </HeaderContainer>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} user={user} logout={handleLogout} />
    </>
  );
};

export default Header; 