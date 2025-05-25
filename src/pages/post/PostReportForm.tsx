import React, { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 1000;
`;
const Modal = styled.div`
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: #fffbe9;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  padding: 2rem;
  z-index: 1001;
  min-width: 340px;
`;
const Title = styled.h3`
  margin-bottom: 1rem;
`;
const Label = styled.label`
  font-weight: bold;
  margin-top: 1rem;
  display: block;
`;
const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #a67c52;
  margin-bottom: 1rem;
`;
const Textarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  border-radius: 6px;
  border: 1px solid #a67c52;
  padding: 0.5rem;
  margin-bottom: 1rem;
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
  padding: 0.5rem 1.2rem;
  font-weight: bold;
  cursor: pointer;
`;

interface PostReportFormProps {
  postId: number;
  author: string;
  onClose: () => void;
}

const categories = [
  '욕설/비방',
  '음란/선정성',
  '도배/광고',
  '개인정보 노출',
  '기타',
];

const PostReportForm: React.FC<PostReportFormProps> = ({ postId, author, onClose }) => {
  const [category, setCategory] = useState(categories[0]);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // 실제 신고 API 호출 시 postId, author, category, content 전달
    setTimeout(() => {
      alert('신고가 접수되었습니다.');
      setSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <Modal>
        <Title>게시글 신고</Title>
        <form onSubmit={handleSubmit}>
          <Label>신고 카테고리</Label>
          <Select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Label>신고 내용</Label>
          <Textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="신고 사유를 입력하세요"
            required
          />
          <div style={{ fontSize: '0.9rem', color: '#a67c52', marginBottom: '1rem' }}>
            (자동 포함) 게시글ID: {postId}, 작성자: {author}
          </div>
          <ButtonRow>
            <Button type="button" onClick={onClose} style={{ background: '#ccc', color: '#333' }}>취소</Button>
            <Button type="submit" disabled={submitting}>{submitting ? '신고 중...' : '신고'}</Button>
          </ButtonRow>
        </form>
      </Modal>
    </>
  );
};

export default PostReportForm; 