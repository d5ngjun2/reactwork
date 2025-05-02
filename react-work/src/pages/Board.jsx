import React from 'react';
import styled from 'styled-components';
import useUserStore from '../components/store/useUserStore';
import { Link } from 'react-router-dom';
import useBoardStore from '../components/store/useBoardStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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

const UpdateButton = styled(Link)`
  padding: 0.8rem 2rem;
  background: #78a812;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background 0.3s ease;

  &:hover {
    background: #66a106;
  }
`;
const Board = () => {
  // 로그인 정보만 가져오기
  const user = useUserStore((loginUser) => loginUser.user);

  const boardList = useBoardStore((board) => board.boards);
  const allBoards = useBoardStore((state) => state.SelectAllBoards);
  const navigate = useNavigate();

  // 마운트시 게시글 전부 가져오기
  useEffect(() => {
    allBoards();
  });

  const ClickBoard = (boardId) => {
    navigate(`/BoardDetail/${boardId}`);
  };

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
            {boardList.map((board, index) => (
              <tr key={index} onClick={() => ClickBoard(board.id)}>
                <td>{index + 1}</td>
                <td>{board.writer}</td>
                <td>{board.title}</td>
                <td>{board.date}</td>
                <td>{board.views ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </Card>
      </Container>
      {user && <UpdateButton to="/EnrollBoard">게시글 작성</UpdateButton>}
    </MainContainer>
  );
};

export default Board;
