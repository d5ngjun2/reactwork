import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f4f4;
  color: #333;
  display: flex;
  justify-content: center;
  padding: 2rem;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

const Card = styled.div`
  background: #d9d9d9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 450px;
  justify-content: space-between;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 320px;
  border: none;
  border-radius: 8px;
`;

const Video = () => {
  const videoData = [
    {
      title: '[24/25 UCL] 바르셀로나 vs 인터 밀란 라민 야말 주요장면',
      url: 'https://www.youtube.com/embed/KJkdORtSwGY',
    },
    {
      title: '[24/25 UCL] 바르셀로나 vs 인터 밀란 둠프리스 주요장면',
      url: 'https://www.youtube.com/embed/BDydGTeYrkc',
    },
    {
      title: '[24/25 UCL] 아스날 vs PSG 돈나룸마 주요장면',
      url: 'https://youtube.com/embed/vVW-tNcuee8',
    },
    {
      title: '2024/25 PL 34R 최고의 순간',
      url: 'https://youtube.com/embed/p_8ii1zdOq4',
    },
    {
      title: '[24/25 PL] 34R 본머스 vs 맨유 H/L｜SPOTV FOOTBALL',
      url: 'https://youtube.com/embed/bjJfUB4GRlw',
    },
    {
      title: '[24/25 PL] 34R 리버풀 vs 토트넘 H/L｜SPOTV FOOTBALL',
      url: 'https://www.youtube.com/embed/U-7gHwE5sHo',
    },
    // 여기에 더 추가 가능
  ];

  return (
    <MainContainer>
      <Container>
        {videoData.map((video, index) => (
          <Card key={index}>
            <Title>{video.title}</Title>
            <StyledIframe
              src={video.url}
              title={`YouTube video ${index}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Card>
        ))}
      </Container>
    </MainContainer>
  );
};

export default Video;
