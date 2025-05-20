import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background-color: #fafafa;
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
              url('/images/baseball-stadium.jpg') center/cover;
  padding: 4rem 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const FeaturesSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <Title>야구의 모든 것, 여기서 만나보세요</Title>
        <Subtitle>
          최신 야구 소식부터 팀과 선수들의 이야기까지,
          야구를 사랑하는 모든 분들을 위한 커뮤니티입니다.
        </Subtitle>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureTitle>실시간 경기 정보</FeatureTitle>
          <FeatureDescription>
            KBO, MLB 등 전 세계 야구 경기의 실시간 정보를 확인하세요.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>커뮤니티</FeatureTitle>
          <FeatureDescription>
            야구 팬들과 함께 이야기를 나누고 정보를 공유하세요.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>선수 프로필</FeatureTitle>
          <FeatureDescription>
            선수들의 상세한 통계와 정보를 한눈에 확인하세요.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default HomePage; 