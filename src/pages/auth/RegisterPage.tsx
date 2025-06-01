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

const ValidationMessage = styled.div<{ isValid?: boolean }>`
  font-size: 0.8rem;
  margin-top: 4px;
  color: ${props => props.isValid ? theme.colors.success : theme.colors.error};
`;

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    email: '',
    favoriteTeamId: ''
  });

  const [validation, setValidation] = useState({
    loginId: { isValid: false, message: '' },
    password: { isValid: false, message: '' },
    confirmPassword: { isValid: false, message: '' },
    nickname: { isValid: false, message: '' },
    email: { isValid: false, message: '' },
    favoriteTeamId: { isValid: false, message: '' }
  });

  const navigate = useNavigate();
  const userRepository = new UserRepositoryImpl();
  const { register, loading, error } = useAuth(userRepository);

  const validateLoginId = (value: string) => {
    if (!value) {
      return { isValid: false, message: '로그인 아이디는 필수입니다.' };
    }
    if (value.length < 5 || value.length > 20) {
      return { isValid: false, message: '로그인 아이디는 5~20자여야 합니다.' };
    }
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return { isValid: false, message: '로그인 아이디는 영문 대·소문자와 숫자 조합만 허용됩니다.' };
    }
    return { isValid: true, message: '사용 가능한 아이디입니다.' };
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return { isValid: false, message: '비밀번호는 필수입니다.' };
    }
    if (value.length < 8 || value.length > 72) {
      return { isValid: false, message: '비밀번호는 8자 이상 72자 이하여야 합니다.' };
    }
    return { isValid: true, message: '사용 가능한 비밀번호입니다.' };
  };

  const validateConfirmPassword = (value: string, password: string) => {
    if (!value) {
      return { isValid: false, message: '비밀번호 확인은 필수입니다.' };
    }
    if (value !== password) {
      return { isValid: false, message: '비밀번호가 일치하지 않습니다.' };
    }
    return { isValid: true, message: '비밀번호가 일치합니다.' };
  };

  const validateNickname = (value: string) => {
    if (!value) {
      return { isValid: false, message: '닉네임은 필수입니다.' };
    }
    if (value.length < 5 || value.length > 20) {
      return { isValid: false, message: '닉네임은 5~20자여야 합니다.' };
    }
    return { isValid: true, message: '사용 가능한 닉네임입니다.' };
  };

  const validateEmail = (value: string) => {
    if (!value) {
      return { isValid: false, message: '이메일은 필수입니다.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { isValid: false, message: '유효한 이메일 주소를 입력해주세요.' };
    }
    return { isValid: true, message: '유효한 이메일 주소입니다.' };
  };

  const validateFavoriteTeamId = (value: string) => {
    if (!value) {
      return { isValid: false, message: '응원 팀 ID는 필수입니다.' };
    }
    return { isValid: true, message: '유효한 팀 ID입니다.' };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 각 필드별 유효성 검사
    switch (name) {
      case 'loginId':
        setValidation(prev => ({
          ...prev,
          loginId: validateLoginId(value)
        }));
        break;
      case 'password':
        setValidation(prev => ({
          ...prev,
          password: validatePassword(value),
          confirmPassword: validateConfirmPassword(formData.confirmPassword, value)
        }));
        break;
      case 'confirmPassword':
        setValidation(prev => ({
          ...prev,
          confirmPassword: validateConfirmPassword(value, formData.password)
        }));
        break;
      case 'nickname':
        setValidation(prev => ({
          ...prev,
          nickname: validateNickname(value)
        }));
        break;
      case 'email':
        setValidation(prev => ({
          ...prev,
          email: validateEmail(value)
        }));
        break;
      case 'favoriteTeamId':
        setValidation(prev => ({
          ...prev,
          favoriteTeamId: validateFavoriteTeamId(value)
        }));
        break;
    }
  };

  const handleLoginIdBlur = async () => {
    if (!formData.loginId) return;
    
    try {
      const exists = await userRepository.checkLoginIdExists(formData.loginId);
      if (exists) {
        setValidation(prev => ({
          ...prev,
          loginId: { isValid: false, message: '중복된 로그인 아이디입니다.' }
        }));
      } else {
        setValidation(prev => ({
          ...prev,
          loginId: { isValid: true, message: '사용 가능한 아이디입니다.' }
        }));
      }
    } catch (err) {
      console.error('아이디 중복 확인 실패:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 모든 필드의 유효성 검사
    const isFormValid = Object.values(validation).every(v => v.isValid);
    
    if (!isFormValid) {
      alert('모든 필드를 올바르게 입력해주세요.');
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
          <ValidationMessage isValid={validation.loginId.isValid}>
            {validation.loginId.message}
          </ValidationMessage>

          <Input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
          <ValidationMessage isValid={validation.nickname.isValid}>
            {validation.nickname.message}
          </ValidationMessage>

          <Input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <ValidationMessage isValid={validation.email.isValid}>
            {validation.email.message}
          </ValidationMessage>

          <Input
            type="text"
            name="favoriteTeamId"
            placeholder="응원 팀 ID (예: samsung)"
            value={formData.favoriteTeamId}
            onChange={handleChange}
            required
          />
          <ValidationMessage isValid={validation.favoriteTeamId.isValid}>
            {validation.favoriteTeamId.message}
          </ValidationMessage>

          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <ValidationMessage isValid={validation.password.isValid}>
            {validation.password.message}
          </ValidationMessage>

          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <ValidationMessage isValid={validation.confirmPassword.isValid}>
            {validation.confirmPassword.message}
          </ValidationMessage>

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