import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import useBoardStore from '../components/store/useBoardStore'; // useBoardStore 임포트
import useUserStore from '../components/store/useUserStore';
import { toast } from 'react-toastify';

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
  const { boardId } = useParams();
  const boardNo = Number(boardId);

  const user = useUserStore((state) => state.user);
  const boards = useBoardStore((state) => state.boards);
  // ✨ useBoardStore에서 increaseViewCount 액션을 가져옵니다. ✨
  const { deleteBoard, fetchBoardById, increaseViewCount } = useBoardStore();

  const [boardDetails, setBoardDetails] = useState(null);
  const navigate = useNavigate();
  const hasIncreasedView = useRef(false); // 페이지 진입 시 한 번만 조회수 증가를 위한 플래그

  // 게시글 상세 정보 로드 및 조회수 증가 로직을 처리하는 useEffect
  useEffect(() => {
    const loadBoardDetails = async () => {
      const cachedBoard = boards.find((board) => board.boardNo === boardNo);

      try {
        let currentBoard;
        if (cachedBoard) {
          currentBoard = cachedBoard;
          setBoardDetails(cachedBoard);
        } else {
          // 캐시에 없으면 백엔드에서 가져오기
          const fetchedBoard = await fetchBoardById(boardNo);
          currentBoard = fetchedBoard;
          setBoardDetails(fetchedBoard);
        }

        // ✨✨✨ 여기에 디버깅용 console.log 추가 ✨✨✨
        console.log('--- 조회수 증가 조건 확인 시작 ---');
        console.log('currentBoard 존재:', !!currentBoard); // currentBoard가 null/undefined인지 확인
        console.log('hasIncreasedView.current:', hasIncreasedView.current); // useRef 값 확인
        console.log('user?.userName:', user?.userName); // 로그인 사용자 이름
        console.log('boardDetails.writerName (게시글 작성자):', currentBoard?.writerName); // 게시글 작성자 이름
        console.log(
          '작성자 불일치 여부 (user?.userName !== currentBoard?.writerName):',
          user?.userName !== currentBoard?.writerName
        );
        console.log('--- 조회수 증가 조건 확인 끝 ---');

        // ✨ 게시글이 로드되었고, 아직 조회수를 증가시키지 않았으며, 게시글 작성자가 아닐 때
        if (currentBoard && !hasIncreasedView.current && user?.userName !== currentBoard.writerName) {
          await increaseViewCount(boardNo); // 백엔드에 조회수 증가 요청
          hasIncreasedView.current = true; // 요청 보냈음을 표시

          // 프론트엔드 상태 업데이트: 백엔드 API가 성공했으므로 로컬 상태도 업데이트하여 즉시 반영
          setBoardDetails((prev) => ({
            ...prev,
            views: (prev.views || 0) + 1,
          }));
        }
      } catch (error) {
        console.error('게시글 상세 정보 가져오기 또는 조회수 증가 실패:', error);
        toast.error('게시글을 불러오거나 조회수를 업데이트하는 데 실패했습니다.');
        navigate('/board', { replace: true });
      }
    };

    if (boardNo) {
      loadBoardDetails();
    }
  }, [boardNo, boards, fetchBoardById, navigate, user?.userName, increaseViewCount]); // increaseViewCount를 의존성 배열에 추가

  const handleDelete = async () => {
    if (!boardDetails) return;

    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteBoard(boardDetails.boardNo);
        toast.success('게시글이 삭제되었습니다.');
        navigate('/board', { replace: true });
      } catch (error) {
        toast.error('게시글 삭제에 실패했습니다.');
        console.error('게시글 삭제 실패:', error);
      }
    }
  };

  if (!boardDetails) {
    return <div>게시글을 로드 중이거나 찾을 수 없습니다...</div>;
  }

  return (
    <MainContainer>
      <EnrollForm>
        <h2>게시글 상세보기</h2>

        <FormGroup>
          <Label>제목</Label>
          <InputTitle type="text" value={boardDetails.boardTitle || ''} readOnly />
        </FormGroup>

        <FormGroup>
          <Label>날짜</Label>
          <InputTitle
            type="text"
            value={boardDetails.enrollDate ? new Date(boardDetails.enrollDate).toLocaleDateString() : ''}
            readOnly
          />
        </FormGroup>

        <FormGroup>
          <Label>작성자</Label>
          <InputTitle type="text" value={boardDetails.writerName || ''} readOnly />
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <TextArea value={boardDetails.boardContent || ''} readOnly />
        </FormGroup>

        <ButtonGroup>
          <ActionButton type="button" onClick={() => navigate('/board')}>
            돌아가기
          </ActionButton>
          {user?.userName === boardDetails.writerName && (
            <>
              <ActionButton onClick={() => navigate(`/boardedit/${boardDetails.boardNo}`)}>수정</ActionButton>
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
