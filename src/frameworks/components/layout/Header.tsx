import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
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


const ProfileMenuContainer = styled.div`
  position: relative;
`;

// SVG 아이콘을 담는 버튼
const ProfileIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.background};
  }

  svg {
    width: 24px;
    height: 24px;
    color: ${theme.colors.text.primary};
  }
`;

// 드롭다운 메뉴 (말풍선)
const DropdownContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 10px); // 아이콘 아래에 10px 간격
  right: 0;
  width: 250px;
  background-color: white;
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.leather};
  padding: ${theme.spacing.md};
  z-index: 110;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: opacity 0.2s ease, transform 0.2s ease;

  ${props => props.$isOpen && css`
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  `}

  // 말풍선 꼬리 만들기
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    right: 15px;
    border-width: 0 10px 10px 10px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
`;

// 드롭다운 내부 프로필 섹션
const DropdownProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.secondary};
`;

const DropdownProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  span {
    font-size: 1.5rem;
    color: white;
  }
`;

const DropdownUsername = styled.span`
  font-weight: bold;
  color: ${theme.colors.text.primary};
`;

// 드롭다운 메뉴 아이템 리스트
const DropdownMenuList = styled.div`
  padding-top: ${theme.spacing.sm};
`;

const DropdownMenuItem = styled(Link)`
  display: block;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  color: ${theme.colors.text.primary};
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${theme.colors.background};
  }
`;

const DropdownMenuButton = styled.button`
  /* DropdownMenuItem과 스타일을 통일하기 위해 css 복사 */
  display: block;
  width: 100%;
  text-align: left;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  color: ${theme.colors.text.primary};
  text-decoration: none;
  transition: background-color 0.2s ease;
  background: none;
  border: none;
  font-size: 1rem; // Link 태그와 폰트 크기 맞춤
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.background};
  }
`;

// 마이페이지 아이콘 SVG
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
            {/* <button onClick={handleLogUserMe} style={{ marginRight: 12, padding: '6px 12px', borderRadius: 6, border: '1px solid #ccc', background: '#f9f9f9', cursor: 'pointer' }}>
              내 정보 콘솔로그
            </button> */}
            {!loading && (
              <>
                {user ? (
                  <ProfileMenuContainer ref={dropdownRef}>
                    <ProfileIconButton onClick={() => setIsDropdownOpen(prev => !prev)} aria-label="사용자 메뉴">
                      <UserIcon />
                    </ProfileIconButton>
                    <DropdownContainer $isOpen={isDropdownOpen}>
                      <DropdownProfileSection>
                        <DropdownProfileImage>
                          {user.profileImageUrl && user.profileImageUrl !== 'default_profile_image_url' ? (
                            <img src={user.profileImageUrl} alt={user.nickname} />
                          ) : (
                            <span>{user.nickname[0]}</span>
                          )}
                        </DropdownProfileImage>
                        <DropdownUsername>{user.nickname}</DropdownUsername>
                      </DropdownProfileSection>
                      <DropdownMenuList>
                        <DropdownMenuItem to="/mypage" onClick={() => setIsDropdownOpen(false)}>
                          마이페이지
                        </DropdownMenuItem>
                        <DropdownMenuButton onClick={handleLogout}>
                          로그아웃
                        </DropdownMenuButton>
                      </DropdownMenuList>
                    </DropdownContainer>
                  </ProfileMenuContainer>
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