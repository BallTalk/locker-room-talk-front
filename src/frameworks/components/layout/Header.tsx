import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  const { user, logout } = useAuthContext();

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
            {user ? (
              <>
                <NavLink to="/mypage">{user.nickname}님</NavLink>
                <LogoutButton onClick={logout}>로그아웃</LogoutButton>
              </>
            ) : (
              <AuthButton as={Link} to="/auth/login">로그인</AuthButton>
            )}
          </NavSection>
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>☰</MobileMenuButton>
        </HeaderContent>
      </HeaderContainer>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Header; 