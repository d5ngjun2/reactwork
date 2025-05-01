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

const Card = styled.table`
  width: 100%;
  background: #fff;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem;
  border-collapse: collapse;

  th,
  td {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #4caf50;
    color: #fff;
    font-weight: 600;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  td {
    color: #555;
    font-size: 1rem;
  }
`;

const Board = () => {
  return (
    <MainContainer>
      <Container>
        <Card>
          <thead>
            <tr>
              <td>게시글 번호</td>
              <td>작성자</td>
              <td>제목</td>
              <td>날짜</td>
              <td>조회수</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>황동준</td>
              <td>임시 제목</td>
              <td>2025.05.01</td>
              <td>30</td>
            </tr>
            <tr>
              <td>1</td>
              <td>황동준</td>
              <td>임시 제목</td>
              <td>2025.05.01</td>
              <td>30</td>
            </tr>
            <tr>
              <td>1</td>
              <td>황동준</td>
              <td>임시 제목</td>
              <td>2025.05.01</td>
              <td>30</td>
            </tr>
          </tbody>
        </Card>
      </Container>
    </MainContainer>
  );
};

export default Board;
