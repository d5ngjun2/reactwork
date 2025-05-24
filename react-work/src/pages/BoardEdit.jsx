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
  const { boardId } = useParams();
  // boardId를 숫자로 변환하여 사용합니다.
  const boardNo = Number(boardId);

  const boards = useBoardStore((state) => state.boards);
  const { updateBoard, fetchBoardById } = useBoardStore(); // SelectAllBoards 대신 fetchBoardById 사용 권장
  const navigate = useNavigate();

  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [boardDetails, setBoardDetails] = useState(null); // 특정 게시글 상세 정보를 저장할 상태

  // 게시글 상세 정보 로드
  useEffect(() => {
    const loadBoardDetails = async () => {
      setIsLoading(true);
      try {
        // 캐시된 boards에서 먼저 찾고, 없으면 API 호출
        const cachedBoard = boards.find((b) => b.boardNo === boardNo);
        if (cachedBoard) {
          setBoardDetails(cachedBoard);
          setEditTitle(cachedBoard.boardTitle);
          setEditContent(cachedBoard.boardContent);
        } else {
          // 캐시에 없으면 서버에서 직접 가져옵니다.
          const fetchedBoard = await fetchBoardById(boardNo);
          setBoardDetails(fetchedBoard);
          setEditTitle(fetchedBoard.boardTitle);
          setEditContent(fetchedBoard.boardContent);
        }
      } catch (error) {
        console.error('게시글 상세 정보 가져오기 실패:', error);
        toast.error('게시글 정보를 불러오는 데 실패했습니다.');
        navigate('/board', { replace: true }); // 오류 시 목록 페이지로 리다이렉트
      } finally {
        setIsLoading(false);
      }
    };

    if (boardNo) {
      // boardNo가 유효할 때만 실행
      loadBoardDetails();
    } else {
      // boardNo가 유효하지 않으면 로딩 상태 해제 및 에러 메시지
      setIsLoading(false);
      toast.error('유효하지 않은 게시글 번호입니다.');
      navigate('/board', { replace: true });
    }
  }, [boardNo, boards, fetchBoardById, navigate]); // 의존성 배열에 필요한 값 추가

  const handleSave = async () => {
    if (!boardDetails) {
      // board 대신 boardDetails 사용
      toast.error('게시글을 찾을 수 없습니다.');
      return;
    }

    try {
      // updateBoard 함수에 게시글 번호와 수정할 데이터를 전달
      await updateBoard(boardDetails.boardNo, {
        // board.id 대신 boardDetails.boardNo
        boardTitle: editTitle, // title 대신 boardTitle
        boardContent: editContent, // content 대신 boardContent
      });
      toast.success('게시글이 수정되었습니다.');
      navigate(`/BoardDetail/${boardDetails.boardNo}`); // board.id 대신 boardDetails.boardNo
    } catch (err) {
      toast.error('게시글 수정에 실패했습니다.');
      console.error('게시글 수정에 실패했습니다.', err); // console.log 대신 console.error
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

  // boardDetails가 null이면 (찾지 못했거나 오류) 메시지 표시
  if (!boardDetails) {
    return (
      <MainContainer>
        <div>게시글을 찾을 수 없거나 로드에 실패했습니다.</div>
        <button onClick={() => navigate('/board')}>목록으로 돌아가기</button>
      </MainContainer>
    );
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
        <button type="button" onClick={() => navigate(`/BoardDetail/${boardDetails.boardNo}`)}>
          {' '}
          {/* board.id 대신 boardDetails.boardNo */}
          취소
        </button>
      </EditForm>
    </MainContainer>
  );
};

export default BoardEdit;
