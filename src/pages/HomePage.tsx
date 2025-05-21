import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

const Hero = styled.section`
  text-align: center;
  padding: ${theme.spacing.xxl} 0;
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.large};
  margin-bottom: ${theme.spacing.xxl};
  box-shadow: ${theme.shadows.leather};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${theme.spacing.xl} 0;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
`;

const CarouselSlide = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const CarouselContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 2;
  width: 100%;
  padding: 0 ${theme.spacing.xl};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: white;
  margin-bottom: ${theme.spacing.lg};
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: white;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0 ${theme.spacing.md};
  }
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: ${theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${theme.spacing.sm};
  z-index: 2;
`;

const Dot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: ${props => props.active ? 'white' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const Features = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xxl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FeatureCard = styled.div`
  background: white;
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.leather};
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    pointer-events: none;
  }
`;

const FeatureTitle = styled.h3`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  font-size: 1.5rem;
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1578432014316-48b448d79d57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '야구 커뮤니티에 오신 것을 환영합니다',
      subtitle: '야구 팬들을 위한 최고의 커뮤니티 플랫폼에서 다양한 정보를 공유하고 소통하세요.'
    },
    {
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      title: '실시간 경기 정보',
      subtitle: 'KBO, MLB 등 전 세계 야구 경기의 실시간 정보를 확인하세요.'
    },
    {
      image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      title: '팬 커뮤니티',
      subtitle: '같은 팀을 응원하는 팬들과 함께 이야기를 나누고 정보를 공유하세요.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <HomeContainer>
      <Hero>
        <CarouselContainer>
          {slides.map((slide, index) => (
            <CarouselSlide
              key={index}
              active={index === currentSlide}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <CarouselContent>
                <Title>{slide.title}</Title>
                <Subtitle>{slide.subtitle}</Subtitle>
              </CarouselContent>
            </CarouselSlide>
          ))}
          <CarouselDots>
            {slides.map((_, index) => (
              <Dot
                key={index}
                active={index === currentSlide}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </CarouselDots>
        </CarouselContainer>
      </Hero>

      <Features>
        <FeatureCard>
          <FeatureTitle>실시간 경기 정보</FeatureTitle>
          <FeatureDescription>
            KBO, MLB 등 전 세계 야구 경기의 실시간 정보를 확인하세요.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>팬 커뮤니티</FeatureTitle>
          <FeatureDescription>
            같은 팀을 응원하는 팬들과 함께 이야기를 나누고 정보를 공유하세요.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>선수 프로필</FeatureTitle>
          <FeatureDescription>
            선수들의 상세한 통계와 정보를 한눈에 확인할 수 있습니다.
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </HomeContainer>
  );
};

export default HomePage; 