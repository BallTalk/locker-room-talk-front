import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { useAuthContext } from '../../context/AuthContext';
import { api } from '../../infrastructures/api/api';
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs}; // 라벨, 인풋, 메시지 간 간격
`;


const Label = styled.label`
  font-weight: bold;
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
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
  &:disabled {
    background-color: ${theme.colors.background};
    cursor: not-allowed;
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

const InputWithButton = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: flex-start;
`;

const SmallButton = styled.button`
  padding: ${theme.spacing.md};
  background: ${theme.colors.secondary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.medium};
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  padding: ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.medium};
  font-size: 1rem;
  cursor: pointer;
  margin-top: ${theme.spacing.md};

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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


const ApiErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-size: 0.9rem;
  text-align: center;
  min-height: 1.2em;
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-size: 0.9rem;
  text-align: center;
  min-height: 1.2em;
`;

const TimerText = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.primary};
  margin-left: ${theme.spacing.sm};
`;

const ValidationMessage = styled.p<{ $isValid?: boolean }>`
  font-size: 0.8rem;
  margin-top: 4px;
  min-height: 1.1em;
  color: ${props => (props.$isValid === undefined ? 'transparent' : props.$isValid ? theme.colors.success : theme.colors.error)};
`;

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phoneNumber: '',
    verificationCode: '',
    favoriteTeam: 'NOT_SET',
  });

  const [validation, setValidation] = useState({
    loginId: { isValid: false, message: '' },
    password: { isValid: false, message: '' },
    confirmPassword: { isValid: false, message: '' },
    nickname: { isValid: false, message: '' },
    phoneNumber: { isValid: undefined as boolean | undefined, message: '' },
  });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, loading } = useAuthContext();
  const navigate = useNavigate();
  const userRepository = new UserRepositoryImpl();

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

  const validatePhoneNumber = (value: string) => {
    if (!value) return { isValid: undefined, message: '' };
    if (!/^010\d{8}$/.test(value)) return { isValid: false, message: "'-' 없이 11자리 휴대폰 번호를 입력해주세요." };
    return { isValid: true, message: '올바른 형식의 번호입니다.' };
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);


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
          setValidation(prev => ({ ...prev, password: validatePassword(value) }));
          if (formData.confirmPassword) {
              setValidation(prev => ({...prev, confirmPassword: validateConfirmPassword(formData.confirmPassword, value)}));
          }
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
    }
  };

  const handleSendCode = async () => {
    const { isValid } = validatePhoneNumber(formData.phoneNumber);
    if (!isValid) {
      setApiError('올바른 형식의 휴대폰 번호를 입력해주세요.');
      return;
    }
    setApiError(null);
    try {
      await api.post('/auth/sms/send', { phoneNumber: formData.phoneNumber, purpose: 'SIGNUP' });
      alert('인증번호가 발송되었습니다.');
      setIsCodeSent(true);
      setTimer(300);
    } catch (err: any) { setApiError(err.response?.data?.message || '인증번호 발송에 실패했습니다.'); }
  };

  const handleLoginIdBlur = async () => {
    if (!validation.loginId.isValid) return;
    try {
      const exists = await userRepository.checkLoginIdExists(formData.loginId);
      if (exists) {
        setValidation(prev => ({ ...prev, loginId: { isValid: false, message: '이미 사용 중인 아이디입니다.' }}));
      }
    } catch (err) { console.error('아이디 중복 확인 실패:', err); }
  };
  

  // 인증번호 확인 요청
  const handleVerifyCode = async () => {
    if (!formData.verificationCode) {
      setApiError('인증번호를 입력해주세요.');
      return;
    }
    setApiError(null);
    try {
      await api.post('/auth/sms/verify', {
        phoneNumber: formData.phoneNumber,
        code: formData.verificationCode,
        purpose: 'SIGNUP',
      });
      alert('인증에 성공했습니다.');
      setIsPhoneVerified(true);
      setTimer(0); // 타이머 중지
    } catch (err: any) {
      setApiError(err.response?.data?.message || '인증번호가 올바르지 않습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 모든 필드의 유효성 검사
    const isFormValid = Object.values(validation).every(v => v.isValid === true);
    if (!isFormValid || !isPhoneVerified) {
      alert('입력 정보를 모두 올바르게 채우고, 휴대폰 인증을 완료해주세요.');
      return;
    }

    setApiError(null);
    try {
      await register(formData);
      navigate('/');
    } catch (err: any) { setApiError(err.response?.data?.message || '회원가입에 실패했습니다.'); }
  };

  const isAllFieldsValid = Object.values(validation).every(v => v.isValid === true);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${minutes}:${formattedSeconds}`;
  };
  
  return (
    <Container>
      <FormContainer>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="loginId">아이디</Label>
            <Input id="loginId" name="loginId" value={formData.loginId} onChange={handleChange} onBlur={handleLoginIdBlur} required />
            <ValidationMessage $isValid={validation.loginId.isValid}>{validation.loginId.message}</ValidationMessage>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="nickname">닉네임</Label>
            <Input id="nickname" name="nickname" value={formData.nickname} onChange={handleChange} required />
            <ValidationMessage $isValid={validation.nickname.isValid}>{validation.nickname.message}</ValidationMessage>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
            <ValidationMessage $isValid={validation.password.isValid}>{validation.password.message}</ValidationMessage>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
            <ValidationMessage $isValid={validation.confirmPassword.isValid}>{validation.confirmPassword.message}</ValidationMessage>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phoneNumber">휴대폰 번호</Label>
            <InputWithButton>
              <Input id="phoneNumber" name="phoneNumber" placeholder="'-' 없이 숫자만 입력" value={formData.phoneNumber} onChange={handleChange} disabled={isPhoneVerified} required />
              <SmallButton type="button" onClick={handleSendCode} disabled={!validation.phoneNumber.isValid || isPhoneVerified || timer > 0}>
                {isCodeSent ? '재전송' : '인증 요청'}
              </SmallButton>
            </InputWithButton>
            <ValidationMessage $isValid={validation.phoneNumber.isValid}>{validation.phoneNumber.message}</ValidationMessage>
          </FormGroup>

          {isCodeSent && !isPhoneVerified && (
            <FormGroup>
              <Label htmlFor="verificationCode">인증번호</Label>
              <InputWithButton>
                <Input id="verificationCode" name="verificationCode" placeholder="6자리 숫자" value={formData.verificationCode} onChange={handleChange} required />
                <SmallButton type="button" onClick={handleVerifyCode}>인증 확인</SmallButton>
              </InputWithButton>
              {timer > 0 && <TimerText>남은 시간: {formatTime(timer)}</TimerText>}
            </FormGroup>
          )}
          
          <ApiErrorMessage>{apiError}</ApiErrorMessage>
          
          <SubmitButton type="submit" disabled={!isAllFieldsValid || !isPhoneVerified || loading}>
            {loading ? '가입 중...' : '회원가입'}
          </SubmitButton>
        </Form>
        <Links>이미 계정이 있으신가요? <Link to="/auth/login">로그인</Link></Links>
      </FormContainer>
    </Container>
  );
};

export default RegisterPage; 