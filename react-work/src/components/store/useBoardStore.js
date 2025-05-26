import { create } from 'zustand';
import axios from 'axios';

// 백엔드 API의 기본 URL을 정확히 설정합니다.
// 스프링 부트 서버가 실행되는 주소와 포트를 확인하여 입력하세요.
const API_BASE_URL = 'http://localhost:8888'; // 예를 들어, 스프링 부트가 8888 포트에서 실행 중이라면

const useBoardStore = create((set, get) => ({
  boards: [],

  // 게시글 전체 목록 가져오기
  SelectAllBoards: async () => {
    try {
      // API_BASE_URL을 사용하여 요청 URL을 구성
      const response = await axios.get(`${API_BASE_URL}/api/board`); // ⭐ 수정: 템플릿 리터럴 사용
      set({ boards: response.data });
    } catch (err) {
      console.error('게시글 가져오기 실패:', err);
      // 에러 처리: 사용자에게 메시지를 보여주거나, 상태를 업데이트하여 로딩 실패를 알릴 수 있음
      throw err; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있도록 할 수도 있습니다.
    }
  },

  // 게시글 하나 추가
  addBoard: async (formData) => {
    try {
      // API_BASE_URL을 사용하여 요청 URL을 구성
      const response = await axios.post(`${API_BASE_URL}/api/board/create`, formData); // ⭐ 수정: API_BASE_URL 사용, 엔드포인트 확인
      console.log('백엔드 응답:', response.data);
      return response.data;
    } catch (err) {
      if (err.response) {
        console.error('에러 응답 데이터:', err.response.data);
        console.error('에러 응답 상태:', err.response.status);
      }
      throw err;
    }
  },

  // 게시글 하나 가져오기 (이 함수는 현재 상태에서만 찾으므로 백엔드 요청이 필요 없음)
  getBoardById: (id) => {
    return (get().boards || []).find((b) => b.boardNo === id);
  },

  // (선택 사항) 서버에서 게시글 하나를 직접 가져오는 함수 (필요하다면)
  fetchBoardById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/board/${id}`);
      return response.data;
    } catch (err) {
      console.error(`게시글 ${id} 가져오기 실패:`, err);
      throw err;
    }
  },

  // 조회수 증가 등 수정할 수 있게 update 기능도 추가 가능
  updateBoard: async (id, updatedData) => {
    try {
      // API_BASE_URL을 사용하여 요청 URL을 구성
      const response = await axios.patch(`${API_BASE_URL}/api/board/${id}`, updatedData); // ⭐ 수정: API_BASE_URL 사용
      set((state) => ({
        boards: state.boards.map((b) => (b.boardNo === id ? response.data : b)),
      }));
    } catch (err) {
      console.error('게시글 수정 실패:', err);
      throw err;
    }
  },

  deleteBoard: async (id) => {
    try {
      // API_BASE_URL을 사용하여 요청 URL을 구성
      await axios.delete(`${API_BASE_URL}/api/board/${id}`); // ⭐ 수정: API_BASE_URL 사용
      // 삭제 후 boards 상태에서도 해당 게시글 제거
      set((state) => ({
        boards: state.boards.filter((b) => b.boardNo !== id),
      }));
      return true;
    } catch (err) {
      console.error('게시글 삭제 실패:', err);
      throw err; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있도록
    }
  },

  // ✨ 새로 추가할 조회수 증가 액션 ✨
  increaseViewCount: async (boardNo) => {
    try {
      // ✨ 백엔드 컨트롤러의 최종 매핑 경로와 정확히 일치시켜야 합니다. ✨
      // 백엔드 @RequestMapping("/api/boards") + @PatchMapping("/{id}/views") 라면
      await axios.patch(`${API_BASE_URL}/api/board/${boardNo}/views`);
      console.log(`게시글 ${boardNo} 조회수 증가 API 호출 성공`);
      // ... (Zustand 상태 업데이트 로직) ...
    } catch (error) {
      console.error(`게시글 ${boardNo} 조회수 증가 실패:`, error);
    }
  },
}));

export default useBoardStore;
