import React from 'react';
import styled from 'styled-components';
import PostItem from '../frameworks/components/ui/PostItem';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
}

const PostListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PostListPage: React.FC = () => {
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
    // 더 많은 게시물 데이터...
  ];

  return (
    <PostListContainer>
      {posts.map(post => (
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
    </PostListContainer>
  );
};

export default PostListPage;
