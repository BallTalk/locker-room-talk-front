// src/frameworks/components/user/ProfileEditForm.tsx

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../../context/AuthContext';
import { theme } from '../../../styles/theme';
import { api } from '../../../infrastructures/api/api';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const ProfileImageSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

const ImagePreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${theme.colors.secondary};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ImageUploadButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  background: white;
  border-radius: ${theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.primary};
    color: white;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: bold;
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
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.medium};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
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
  transition: background-color 0.3s ease;
  align-self: flex-start;

  &:hover {
    background: ${theme.colors.secondary};
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ProfileEditForm: React.FC = () => {
  const { user, checkAuth } = useAuthContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickname] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || '');
      setStatusMessage(user.statusMessage || '');
      const hasImage = user.profileImageUrl && user.profileImageUrl !== 'default_profile_image_url';
      setPreviewUrl(hasImage ? user.profileImageUrl : null);
    }
  }, [user]);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // 파일을 미리보기용 URL로 변환
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let finalImageUrl = user?.profileImageUrl || null;

      // 1. 새로 선택된 파일이 있으면 ImgBB에 업로드
      if (selectedFile) {
        console.log('새 이미지 파일 업로드를 시작합니다.');
        const formData = new FormData();
        formData.append('image', selectedFile);

        // ImgBB API 호출
        const imgbbResponse = await api.post(
          `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`,
          formData,
          {
            withCredentials: false,
            // 이 요청은 우리 서버 API가 아니므로 기본 헤더 설정을 일부러 제외
            transformRequest: (data, headers) => {
                if (headers && headers.common) {
                    delete headers.common['Authorization'];
                }
                return data;
            },
          }
        );

        if (imgbbResponse.data.success) {
          finalImageUrl = imgbbResponse.data.data.url;
          console.log('이미지 업로드 성공! URL:', finalImageUrl);
        } else {
          throw new Error('이미지 업로드에 실패했습니다.');
        }
      }

      // 2. 우리 백엔드 서버에 프로필 정보 업데이트 요청
      const payload = {
        nickname,
        statusMessage,
        profileImageUrl: finalImageUrl, // 업로드된 이미지 URL 또는 기존 URL
      };

      await api.patch('/user/me', payload);

      alert('프로필이 성공적으로 수정되었습니다.');
      await checkAuth(); // 컨텍스트 새로고침

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || '프로필 수정에 실패했습니다.';
      setError(errorMessage);
      console.error('프로필 수정 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label>프로필 이미지</Label>
        <ProfileImageSection>
          <ImagePreview>
            {previewUrl ? (
              <img src={previewUrl} alt="프로필 미리보기" />
            ) : (
              <span>{user.nickname[0].toUpperCase()}</span>
            )}
          </ImagePreview>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <ImageUploadButton type="button" onClick={handleImageButtonClick}>
            이미지 변경
          </ImageUploadButton>
        </ProfileImageSection>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="statusMessage">상태 메시지</Label>
        <TextArea
          id="statusMessage"
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
          placeholder="자신을 표현해보세요."
        />
      </FormGroup>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? '저장 중...' : '정보 저장'}
      </SubmitButton>
    </FormContainer>
  );
};

export default ProfileEditForm;

