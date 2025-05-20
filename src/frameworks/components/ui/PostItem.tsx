import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface PostItemProps {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  viewCount: number;
  likeCount: number;
}

const PostItemContainer = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const PostTitle = styled(Link)`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: block;
  
  &:hover {
    color: #666;
  }
`;

const PostContent = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
`;

const PostInfo = styled.div`
  display: flex;
  gap: 1rem;
`;

const PostStats = styled.div`
  display: flex;
  gap: 1rem;
`;

const PostItem: React.FC<PostItemProps> = ({
  id,
  title,
  content,
  author,
  createdAt,
  viewCount,
  likeCount,
}) => {
  return (
    <PostItemContainer>
      <PostTitle to={`/posts/${id}`}>{title}</PostTitle>
      <PostContent>{content}</PostContent>
      <PostMeta>
        <PostInfo>
          <span>{author}</span>
          <span>{createdAt}</span>
        </PostInfo>
        <PostStats>
          <span>조회 {viewCount}</span>
          <span>좋아요 {likeCount}</span>
        </PostStats>
      </PostMeta>
    </PostItemContainer>
  );
};

export default PostItem; 