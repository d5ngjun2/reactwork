import styled from 'styled-components';
import Slider from 'react-slick'; // react-slick 추가
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
import img4 from '../images/4.jpg';
import img5 from '../images/5.jpg';

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

const SlideImageWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 600px;
  margin-top: 3rem;
  margin-bottom: 5rem;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ImageSlide = styled(Slider)`
  width: 100%;
  height: 100%;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* 이미지를 짤리지 않게 비율 맞추기 */
  display: block;
`;

const Home = () => {
  const images = [img1, img2, img3, img4, img5];

  const settings = {
    dots: true, // 하단에 점 표시
    infinite: true, // 무한 반복
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
    autoplay: true, // 자동 슬라이드
    autoplaySpeed: 3000, // 자동 슬라이드 속도
  };

  return (
    <MainContainer>
      <SlideImageWrapper>
        <ImageSlide {...settings}>
          {images.map((img, idx) => (
            <div key={idx}>
              <SlideImage src={img} alt={`Slide ${idx + 1}`} />
            </div>
          ))}
        </ImageSlide>
      </SlideImageWrapper>

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
