import React, { useState } from 'react';
import styled from 'styled-components';
import PostItem from '../../frameworks/components/ui/PostItem';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
}

const LeatherListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  min-height: 600px;
  position: relative;
`;

const CreatePostButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.3s ease;

  &:hover {
    background-color: #34495e;
    transform: translateY(-2px);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #2c3e50;
  background-color: ${props => props.isActive ? '#2c3e50' : 'white'};
  color: ${props => props.isActive ? 'white' : '#2c3e50'};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2c3e50;
    color: white;
  }
`;

const PostListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const navigate = useNavigate();

  // 임시 데이터
  const posts: Post[] = [
    {
      id: 1,
      title: "오늘의 경기 하이라이트",
      content: "오늘 있었던 경기의 주요 장면들을 정리해봤습니다...",
      author: "야구팬",
      createdAt: "2024-03-20",
      viewCount: 150,
      likeCount: 30
    },
    {
      id: 2,
      title: "선수 트레이드 소식",
      content: "이번 시즌 주요 트레이드 소식을 정리했습니다...",
      author: "스포츠기자",
      createdAt: "2024-03-19",
      viewCount: 280,
      likeCount: 45
    },
    {
      id: 3,
      title: "주말 경기 일정",
      content: "이번 주말 경기 일정과 주요 관전 포인트를 소개합니다...",
      author: "경기안내",
      createdAt: "2024-03-18",
      viewCount: 320,
      likeCount: 67
    },
    {
      id: 4,
      title: "신인 선수 소개",
      content: "이번 시즌 주목해야 할 신인 선수들을 소개합니다...",
      author: "스카우터",
      createdAt: "2024-03-17",
      viewCount: 190,
      likeCount: 28
    },
    {
      id: 5,
      title: "팀 순위 분석",
      content: "현재 시즌 팀 순위와 전망을 분석해봤습니다...",
      author: "분석가",
      createdAt: "2024-03-16",
      viewCount: 410,
      likeCount: 89
    },
    {
      id: 6,
      title: "부상자 현황",
      content: "주요 선수들의 부상 현황과 복귀 일정을 정리했습니다...",
      author: "팀닥터",
      createdAt: "2024-03-15",
      viewCount: 175,
      likeCount: 32
    },
    {
      id: 7,
      title: "경기장 이용 안내",
      content: "경기장 이용 방법과 주차 안내를 공지합니다...",
      author: "경기장관리",
      createdAt: "2024-03-14",
      viewCount: 230,
      likeCount: 15
    }
  ];

  // 현재 페이지의 게시물 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleCreatePost = () => {
    navigate('/post/new');
  };

  return (
    <LeatherListContainer>
      {currentPosts.map(post => (
        <PostItem
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          createdAt={post.createdAt}
          viewCount={post.viewCount}
          likeCount={post.likeCount}
        />
      ))}
      
      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <PageButton
            key={pageNum}
            isActive={currentPage === pageNum}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </PageButton>
        ))}
      </PaginationContainer>

      <CreatePostButton onClick={handleCreatePost}>
        게시글 작성
      </CreatePostButton>
    </LeatherListContainer>
  );
};

export default PostListPage; 