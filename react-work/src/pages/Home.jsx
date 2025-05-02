import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f4f4;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.5rem;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 3rem;
  font-weight: 700;
`;

const SectionWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-left: 1rem;
  color: #444;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
`;

const Card = styled.div`
  flex: 1 1 250px;
  max-width: 300px;
  background: #fff;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
  }

  p {
    font-size: 0.95rem;
    color: #666;
  }
`;

const Home = () => {
  return (
    <MainContainer>
      <Title>오늘의 축구 ⚽</Title>

      <SectionWrapper>
        <SectionTitle>📢 최신 뉴스</SectionTitle>
        <Container>
          <Card>
            <h3>이적 소식</h3>
            <p>최신 이적 선수 소식을 확인하세요.</p>
          </Card>
          <Card>
            <h3>팀 소식</h3>
            <p>팀의 최신 동향과 훈련 소식을 받아보세요.</p>
          </Card>
        </Container>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle>📊 리그 경기 결과</SectionTitle>
        <Container>
          <Card>
            <h3>챔피언스 리그</h3>
            <p>2025년 4월 30일, 바르셀로나 2-1 맨체스터 시티</p>
          </Card>
          <Card>
            <h3>EPL</h3>
            <p>2025년 4월 30일, 리버풀 3-0 아스날</p>
          </Card>
          <Card>
            <h3>LALIGA</h3>
            <p>2025년 4월 29일, 레알 마드리드 2-1 세비야</p>
          </Card>
          <Card>
            <h3>분데스리가</h3>
            <p>2025년 4월 28일, 바이에른 뮌헨 4-2 도르트문트</p>
          </Card>
        </Container>
      </SectionWrapper>
    </MainContainer>
  );
};

export default Home;
