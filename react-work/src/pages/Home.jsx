import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 1000px;
  background: #fff;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #666;
  }
`;

const Home = () => {
  return (
    <MainContainer>
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
    </MainContainer>
  );
};

export default Home;
