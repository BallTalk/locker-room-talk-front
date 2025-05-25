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

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    favoriteTeamId: ''
  });
  const [loginIdError, setLoginIdError] = useState('');
  const navigate = useNavigate();
  const userRepository = new UserRepositoryImpl();
  const { register, loading, error } = useAuth(userRepository);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginIdBlur = async () => {
    if (!formData.loginId) return;
    
    try {
      const exists = await userRepository.checkLoginIdExists(formData.loginId);
      if (exists) {
        setLoginIdError('이미 사용 중인 아이디입니다.');
      } else {
        setLoginIdError('');
      }
    } catch (err) {
      console.error('아이디 중복 확인 실패:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (loginIdError) {
      alert('아이디 중복을 확인해주세요.');
      return;
    }
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="loginId"
            placeholder="아이디"
            value={formData.loginId}
            onChange={handleChange}
            onBlur={handleLoginIdBlur}
            required
          />
          {loginIdError && <div style={{ color: 'red', fontSize: '0.8rem' }}>{loginIdError}</div>}
          <Input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="favoriteTeamId"
            placeholder="응원 팀 ID (예: samsung)"
            value={formData.favoriteTeamId}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </Button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </Form>
        <Links>
          이미 계정이 있으신가요? <Link to="/auth/login">로그인</Link>
        </Links>
      </FormContainer>
    </Container>
  );
};

export default RegisterPage; 