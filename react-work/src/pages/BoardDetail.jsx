import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import useBoardStore from '../components/store/useBoardStore';
import useUserStore from '../components/store/useUserStore';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f4f4;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
`;

const EnrollForm = styled.form`
  width: 100%;
  max-width: 800px;
  min-height: 700px;
  background: #e0e0e0;
  border-radius: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  gap: 1.5rem;
`;

const InputTitle = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: white;
  font-size: 16px;
  color: #333;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #0f62fe;
    box-shadow: 0 0 0 3px rgba(15, 98, 254, 0.2);
  }
`;

const FormGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-left: 3px;
`;

const TextArea = styled.textarea`
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  height: 250px;
  padding: 12px;
  border: none;
  border-radius: 5px;
  resize: none;
  background: white;
  font-size: 16px;
  color: #333;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #0f62fe;
    box-shadow: 0 0 0 3px rgba(15, 98, 254, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  background-color: #0f62fe;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0053d6;
  }

  &:nth-child(2) {
    background-color: #aaa;

    &:hover {
      background-color: #888;
    }
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #ff0000;

  &:hover {
    background-color: #e20000;
  }
`;

const BoardDetail = () => {
  const { boardId } = useParams(); // URL에서 boardId를 가져옴
  const user = useUserStore((loginUser) => loginUser.user); // 로그인 한 사람의 정보
  const boards = useBoardStore((state) => state.boards);
  const { deleteBoard, updateBoard } = useBoardStore();

  const navigate = useNavigate();

  const board = boards.find((board) => board.id === boardId);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteBoard(board.id); // 게시글 삭제 요청
        toast.success('게시글이 삭제되었습니다.');
        navigate('/board', { replace: true }); // 게시글 삭제 후 /board로 이동
      } catch (error) {
        toast.error('게시글 삭제에 실패했습니다.');
        console.error('게시글 삭제 실패:', error);
      }
    }
  };

  useEffect(() => {
    // 페이지 들어왔을 때 조회수 1 증가
    if (board) {
      updateBoard(board.id, { views: (board.views || 0) + 1 });
    }
  }, [board]);

  return (
    <MainContainer>
      <EnrollForm>
        <h2>게시글 상세보기</h2>

        <FormGroup>
          <Label>제목</Label>
          <InputTitle type="text" value={board.title} readOnly />
        </FormGroup>

        <FormGroup>
          <Label>날짜</Label>
          <InputTitle type="text" value={board.date} readOnly />
        </FormGroup>

        <FormGroup>
          <Label>작성자</Label>
          <InputTitle type="text" value={board.writer} readOnly />
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <TextArea value={board.content} readOnly />
        </FormGroup>

        <ButtonGroup>
          <ActionButton type="button" onClick={() => navigate('/board')}>
            돌아가기
          </ActionButton>
          {user?.name === board.writer && (
            <>
              <ActionButton onClick={() => navigate(`/boardedit/${board.id}`)}>수정</ActionButton>
              <DeleteButton type="button" onClick={handleDelete}>
                삭제
              </DeleteButton>
            </>
          )}
        </ButtonGroup>
      </EnrollForm>
    </MainContainer>
  );
};

export default BoardDetail;
