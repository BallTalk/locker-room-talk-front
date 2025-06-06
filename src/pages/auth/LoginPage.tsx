import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { useAuth } from '../../domains/user/useCases/useAuth';
import { UserRepositoryImpl } from '../../infrastructures/api/UserRepositoryImpl';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background};
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: ${theme.spacing.xl};
  background: white;
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.leather};
`;

const Title = styled.h1`
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const Input = styled.input`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.medium};
  font-size: 1rem;
  
  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }
`;

const Button = styled.button`
  padding: ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.medium};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.secondary};
  }
`;

const SocialLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const SocialButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  img {
    width: 30px;
    height: 30px;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${theme.spacing.lg} 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${theme.colors.secondary};
  }
  
  span {
    padding: 0 ${theme.spacing.md};
    color: ${theme.colors.secondary};
  }
`;

const Links = styled.div`
  margin-top: ${theme.spacing.md};
  text-align: center;
  
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginPage: React.FC = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const userRepository = new UserRepositoryImpl();
  const { login, loading, error } = useAuth(userRepository);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ loginId, password });
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'kakao') => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    const url = `${process.env.REACT_APP_ROOT_URL || 'http://localhost:8080'}/oauth2/authorization/${provider}`;
    window.open(
      url,
      '소셜 로그인',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  return (
    <Container>
      <FormContainer>
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="아이디"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </Button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </Form>
        
        <Divider>
          <span>또는</span>
        </Divider>
        
        <SocialLoginContainer>
          <SocialButton onClick={() => handleSocialLogin('google')}>
            <img src="/images/google-icon.svg" alt="Google" />
          </SocialButton>
          <SocialButton onClick={() => handleSocialLogin('kakao')}>
            <img src="/images/kakao-icon.svg" alt="Kakao" />
          </SocialButton>
        </SocialLoginContainer>

        <Links>
          <Link to="/auth/register">회원가입</Link>
          <span style={{ margin: '0 10px' }}>|</span>
          <Link to="/auth/forgot-password">비밀번호 찾기</Link>
        </Links>
      </FormContainer>
    </Container>
  );
};

export default LoginPage; 