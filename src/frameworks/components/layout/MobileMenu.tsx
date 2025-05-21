import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../../styles/theme';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 1000;
`;

const MenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background: white;
  padding: ${theme.spacing.xl};
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  z-index: 1001;
  box-shadow: ${theme.shadows.leather};
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${theme.colors.primary};
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: ${theme.spacing.xl};
`;

const MenuItem = styled(Link)`
  display: block;
  padding: ${theme.spacing.md};
  color: ${theme.colors.text.primary};
  text-decoration: none;
  border-radius: ${theme.borderRadius.medium};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.background};
    color: ${theme.colors.primary};
  }
`;

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Overlay isOpen={isOpen} onClick={onClose} />
      <MenuContainer isOpen={isOpen}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <MenuList>
          <MenuItem to="/" onClick={onClose}>홈</MenuItem>
          <MenuItem to="/posts" onClick={onClose}>게시판</MenuItem>
          <MenuItem to="/teams" onClick={onClose}>팀</MenuItem>
          <MenuItem to="/players" onClick={onClose}>선수</MenuItem>
          <MenuItem to="/auth/login" onClick={onClose}>로그인</MenuItem>
          <MenuItem to="/auth/register" onClick={onClose}>회원가입</MenuItem>
        </MenuList>
      </MenuContainer>
    </>
  );
};

export default MobileMenu; 