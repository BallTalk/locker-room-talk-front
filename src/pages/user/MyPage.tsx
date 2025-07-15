import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { theme } from '../../styles/theme';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.leather};
  height: fit-content;
`;

const ProfileSection = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto ${theme.spacing.md};
  background-color: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; // 이미지가 원을 벗어나지 않도록

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Username = styled.h2`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const LoginId = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

// active 상태에 따라 스타일을 다르게 주기 위한 props 추가
const MenuItem = styled.li<{ active: boolean }>`
  padding: ${theme.spacing.md};
  cursor: pointer;
  border-radius: ${theme.borderRadius.medium};
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? theme.colors.primary : theme.colors.text.primary};
  
  ${props => props.active && css`
    background: ${theme.colors.background};
  `}

  &:hover {
    background: ${theme.colors.background};
    color: ${theme.colors.primary};
  }
`;

const Content = styled.div`
  background: white;
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.leather};
`;

const SectionTitle = styled.h3`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 2px solid ${theme.colors.secondary};
`;

// 각 메뉴에 해당하는 컨텐츠 컴포넌트 (지금은 placeholder)
const UserProfileContent = () => <p>내 정보를 수정할 수 있습니다.</p>;
const UserPostsContent = () => <p>내가 작성한 게시글 목록이 표시됩니다.</p>;
const LikedPostsContent = () => <p>좋아요를 누른 게시글 목록이 표시됩니다.</p>;
const NotificationSettings = () => <p>알림 설정을 변경할 수 있습니다.</p>;

const MyPage: React.FC = () => {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('내 정보');

  // 비로그인 사용자가 접근했을 경우 로그인 페이지로 쫓아냄
  useEffect(() => {
    // 로딩이 끝났는데 user 정보가 없으면
    if (!loading && !user) {
      alert('로그인이 필요한 페이지입니다.');
      navigate('/auth/login');
    }
  }, [user, loading, navigate]);

  // 로딩 중이거나, 리다이렉션 되기 전까지는 로딩 화면을 보여줌
  if (loading || !user) {
    return <div>로딩 중...</div>;
  }

  // 메뉴에 따라 보여줄 컨텐츠를 결정하는 함수
  const renderContent = () => {
    switch (activeMenu) {
      case '내 정보':
        return <UserProfileContent />;
      case '내 게시글':
        return <UserPostsContent />;
      case '좋아요한 게시글':
        return <LikedPostsContent />;
      case '알림 설정':
        return <NotificationSettings />;
      default:
        return <UserProfileContent />;
    }
  };

  const menuItems = ['내 정보', '내 게시글', '좋아요한 게시글', '알림 설정'];

  return (
    <Container>
      <Sidebar>
        <ProfileSection>
          <ProfileImage>
            {/* user.profileImageUrl이 있으면 이미지를, 없으면 닉네임 첫 글자를 보여줌 */}
            {user.profileImageUrl && user.profileImageUrl !== 'default_profile_image_url' ? (
              <img src={user.profileImageUrl} alt={user.nickname} />
            ) : (
              <span style={{ fontSize: '3rem', color: 'white' }}>{user.nickname[0]}</span>
            )}
          </ProfileImage>
          <Username>{user.nickname}</Username>
          {/* 백엔드 User 모델에 email이 없으므로 loginId를 대신 표시 */}
          <LoginId>{user.loginId}</LoginId>
        </ProfileSection>
        <MenuList>
          {menuItems.map((item) => (
            <MenuItem
              key={item}
              active={activeMenu === item}
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Sidebar>
      <Content>
        <SectionTitle>{activeMenu}</SectionTitle>
        {renderContent()}
      </Content>
    </Container>
  );
};

export default MyPage;
