import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useBoardStore from '../components/store/useBoardStore';
import { toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';

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

const EditForm = styled.form`
  width: 800px;
  margin: 40px auto;
  padding: 24px;
  background-color: #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 24px;
    color: #333;
  }

  div {
    margin-bottom: 16px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
    color: #555;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    background: white;
    color: black;
    box-sizing: border-box;

    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
    background: white;
    color: black;
  }

  button {
    margin-right: 10px;
    padding: 10px 16px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #357ab8;
    }

    &:last-child {
      background-color: #ccc;
      color: #333;

      &:hover {
        background-color: #bbb;
      }
    }
  }
`;
const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 18px;
  color: #333;
`;

const BoardEdit = () => {
  const { boardId } = useParams(); // URL에서 boardId를 가져옴
  const boards = useBoardStore((state) => state.boards);
  const { updateBoard, SelectAllBoards } = useBoardStore();
  const navigate = useNavigate();

  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태를 관리

  // 게시글을 찾고, 없다면 로딩 상태로 처리
  const board = boards.find((board) => board.id === boardId);

  useEffect(() => {
    SelectAllBoards(); // 게시글 목록 로드

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); //

    return () => clearTimeout(timeout); // cleanup: 컴포넌트 언마운트 시 타이머 해제
  }, []);

  // board가 로드되면 수정 데이터를 세팅
  useEffect(() => {
    const currentBoard = boards.find((b) => b.id === boardId);
    if (currentBoard) {
      setEditTitle(currentBoard.title);
      setEditContent(currentBoard.content);
    }
  }, [boards, boardId]);

  const handleSave = async () => {
    if (!board) {
      toast.error('게시글을 찾을 수 없습니다.');
      return;
    }

    try {
      await updateBoard(board.id, { title: editTitle, content: editContent });
      toast.success('게시글이 수정되었습니다.');
      navigate(`/BoardDetail/${board.id}`); //
    } catch (err) {
      toast.error('게시글 수정에 실패했습니다.');
      console.log('게시글 수정에 실패했습니다.', err);
    }
  };

  if (isLoading) {
    return (
      <MainContainer>
        <LoaderContainer>
          <FadeLoader color="#4a90e2" size={15} />
          <LoadingText>로딩중...</LoadingText>
        </LoaderContainer>
      </MainContainer>
    );
  }

  if (!board) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <MainContainer>
      <EditForm>
        <h2>게시글 수정</h2>
        <div>
          <label>제목</label>
          <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
        </div>
        <div>
          <label>내용</label>
          <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
        </div>
        <button type="button" onClick={handleSave}>
          저장
        </button>
        <button type="button" onClick={() => navigate(`/BoardDetail/${board.id}`)}>
          취소
        </button>
      </EditForm>
    </MainContainer>
  );
};

export default BoardEdit;
