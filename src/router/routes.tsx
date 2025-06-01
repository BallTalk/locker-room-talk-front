import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PostListPage from '../pages/post/PostListPage'; 
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import MyPage from '../pages/user/MyPage';
import PostDetailPage from '../pages/post/PostDetailPage';
import PostFormPage from '../pages/post/PostFormPage';
import SocialLoginCallback from '../pages/auth/SocialLoginCallback';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts" element={<PostListPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="/post/edit/:id" element={<PostFormPage />} />
      <Route path="/post/new" element={<PostFormPage />} />
      <Route path="/oauth2/callback" element={<SocialLoginCallback />} />
    </Routes>
  );
};

export default AppRoutes;
