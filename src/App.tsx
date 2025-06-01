import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import AppRoutes from './router/routes';
import Header from './frameworks/components/layout/Header';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
`;

const MainContent = styled.main`
  padding-top: 80px; // 헤더 높이만큼 여백
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <AppRoutes />
        </MainContent>
      </AppContainer>
    </Router>
  );
};

export default App;
