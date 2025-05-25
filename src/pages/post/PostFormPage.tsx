import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background: #fffbe9;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 2rem;
`;
const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;
const Label = styled.label`
  font-weight: bold;
  margin-top: 1rem;
  display: block;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  border-radius: 6px;
  border: 1px solid #a67c52;
  margin-bottom: 1rem;
`;
const Textarea = styled.textarea`
  width: 100%;
  min-height: 180px;
  border-radius: 6px;
  border: 1px solid #a67c52;
  padding: 0.7rem;
  margin-bottom: 1.5rem;
`;
const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
const Button = styled.button`
  background: #a67c52;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.7rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const PostFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  // 임시 데이터 (수정 모드)
  const [form, setForm] = useState({
    title: isEdit ? '수정할 게시글 제목' : '',
    content: isEdit ? '수정할 게시글 내용' : '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // 실제 작성/수정 API 호출
    setTimeout(() => {
      alert(isEdit ? '게시글이 수정되었습니다.' : '게시글이 등록되었습니다.');
      setSubmitting(false);
      navigate('/post');
    }, 800);
  };

  return (
    <FormContainer>
      <Title>{isEdit ? '게시글 수정' : '게시글 작성'}</Title>
      <form onSubmit={handleSubmit}>
        <Label>제목</Label>
        <Input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <Label>내용</Label>
        <Textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
        />
        <ButtonRow>
          <Button type="submit" disabled={submitting}>{submitting ? '저장 중...' : isEdit ? '수정' : '등록'}</Button>
          <Button type="button" style={{ background: '#ccc', color: '#333' }} onClick={() => navigate(-1)}>취소</Button>
        </ButtonRow>
      </form>
    </FormContainer>
  );
};

export default PostFormPage; 