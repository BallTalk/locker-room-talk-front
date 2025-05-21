import React from 'react';
import styled from 'styled-components';
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
  background: ${theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
`;

const Username = styled.h2`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const Email = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  padding: ${theme.spacing.md};
  cursor: pointer;
  border-radius: ${theme.borderRadius.medium};
  transition: all 0.3s ease;
  
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

const MyPage: React.FC = () => {
  // 임시 사용자 데이터
  const user = {
    username: '야구팬',
    email: 'baseball@example.com',
    profileImage: null
  };

  return (
    <Container>
      <Sidebar>
        <ProfileSection>
          <ProfileImage>
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.username} />
            ) : (
              user.username[0]
            )}
          </ProfileImage>
          <Username>{user.username}</Username>
          <Email>{user.email}</Email>
        </ProfileSection>
        <MenuList>
          <MenuItem>내 정보</MenuItem>
          <MenuItem>내 게시글</MenuItem>
          <MenuItem>좋아요한 게시글</MenuItem>
          <MenuItem>알림 설정</MenuItem>
        </MenuList>
      </Sidebar>
      <Content>
        <SectionTitle>내 정보</SectionTitle>
        {/* 여기에 선택된 메뉴에 따른 컨텐츠가 표시됩니다 */}
        <p>내 정보를 수정할 수 있습니다.</p>
      </Content>
    </Container>
  );
};

export default MyPage; 