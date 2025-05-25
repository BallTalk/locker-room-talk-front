import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import PostReportForm from './PostReportForm';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaFlag } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import sirenIcon from '../../assets/icons/siren.png';

// 임시 유저 정보 (실제 구현시 context/recoil/zustand 등에서 가져오면 됨)
const currentUser = {
  username: '야구팬',
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const DetailContainer = styled.div`
  background: #fffbe9;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 2rem;
  min-height: 600px;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

const Meta = styled.div`
  color: #a67c52;
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fff7e6;
  border: 1px solid rgba(166, 124, 82, 0.2);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(166, 124, 82, 0.05);
  line-height: 1.8;
  color: #2c3e50;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

const LikeButton = styled.button<{ liked: boolean }>`
  background: none;
  border: none;
  color: ${({ liked }) => (liked ? '#ff4757' : '#a67c52')};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  span {
    font-size: 0.9rem;
    font-weight: bold;
  }
`;

const ReportButton = styled.button`
  background: none;
  border: none;
  color: #a67c52;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

const CommentSection = styled.div`
  margin-top: 2rem;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  background: #fff7e6;
  border-radius: 8px;
  margin-bottom: 0.7rem;
  padding: 0.7rem 1rem;
  font-size: 0.98rem;
`;

const CommentForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #a67c52;
`;

const CommentButton = styled.button`
  background: #a67c52;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  font-weight: bold;
  cursor: pointer;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: flex-end;
  align-items: center;
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

// 아이콘 컴포넌트
const Icon: React.FC<{ icon: React.ReactElement }> = ({ icon }) => {
  return <>{icon}</>;
};

const PostDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 임시 게시글 데이터
  const [post, setPost] = useState({
    id: 1,
    title: '오늘의 경기 하이라이트',
    content: '오늘 있었던 경기의 주요 장면들을 정리해봤습니다...\n홈런, 역전, 명장면 모음!',
    author: '야구팬',
    createdAt: '2024-03-20',
    likeCount: 30,
    viewCount: 150,
  });
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [showReport, setShowReport] = useState(false);

  // 댓글
  const [comments, setComments] = useState([
    { username: '팬1', content: '정리 감사합니다!', date: '2024-03-20' },
    { username: '팬2', content: '홈런 장면 최고였어요!', date: '2024-03-20' },
  ]);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    axios.get(`/api/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  // 좋아요 토글
  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  // 댓글 등록
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments([
      ...comments,
      { username: currentUser.username, content: commentInput, date: new Date().toISOString().slice(0, 10) },
    ]);
    setCommentInput('');
  };

  // 수정/삭제 (임시)
  const handleEdit = () => {
    navigate(`/post/edit/${post.id}`);
  };
  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      // 삭제 API 호출 후...
      navigate('/post');
    }
  };

  return (
    <PageContainer>
      <DetailContainer>
        <TitleRow>
          <Title>{post.title}</Title>
          <LikeButton liked={liked} onClick={handleLike}>
            {liked ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            )}
            <span>{likeCount}</span>
          </LikeButton>
        </TitleRow>
        <Meta>
          작성자: {post.author} | 작성일: {post.createdAt} | 조회수: {post.viewCount}
        </Meta>
        <Content style={{ whiteSpace: 'pre-line' }}>{post.content}</Content>
        <ButtonRow>
          {post.author === currentUser.username && (
            <>
              <Button onClick={handleEdit}>수정</Button>
              <Button onClick={handleDelete}>삭제</Button>
            </>
          )}
          <ReportButton onClick={() => setShowReport(true)}>
            🚨
          </ReportButton>
        </ButtonRow>
        {showReport && <PostReportForm postId={post.id} author={post.author} onClose={() => setShowReport(false)} />}
        <CommentSection>
          <h3>댓글</h3>
          <CommentList>
            {comments.map((c, i) => (
              <CommentItem key={i}>
                <b>{c.username}</b> | {c.date}
                <div>{c.content}</div>
              </CommentItem>
            ))}
          </CommentList>
          <CommentForm onSubmit={handleCommentSubmit}>
            <CommentInput
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
            <CommentButton type="submit">등록</CommentButton>
          </CommentForm>
        </CommentSection>
      </DetailContainer>
    </PageContainer>
  );
};

export default PostDetailPage; 