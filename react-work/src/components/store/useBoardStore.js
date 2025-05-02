import { create } from 'zustand';
import axios from 'axios';

const useBoardStore = create((set, get) => ({
  boards: [],

  // 게시글 전체 목록 가져오기
  SelectAllBoards: async () => {
    try {
      const response = await axios.get('http://localhost:3001/boards');
      set({ boards: response.data });
    } catch (err) {
      console.error('게시글 가져오기 실패:', err);
    }
  },

  // 게시글 하나 추가
  addBoard: async (newBoard) => {
    try {
      const response = await axios.post('http://localhost:3001/boards', newBoard);
      set((state) => ({
        boards: [...state.boards, response.data],
      }));
    } catch (err) {
      console.error('게시글 추가 실패:', err);
    }
  },

  // 게시글 하나 가져오기
  getBoardById: (id) => {
    return (get().boards || []).find((b) => b.id === id);
  },

  // 조회수 증가 등 수정할 수 있게 update 기능도 추가 가능
  updateBoard: async (id, updatedData) => {
    try {
      const response = await axios.patch(`http://localhost:3001/boards/${id}`, updatedData);
      set((state) => ({
        boards: state.boards.map((b) => (b.id === id ? response.data : b)),
      }));
    } catch (err) {
      console.error('게시글 수정 실패:', err);
    }
  },

  deleteBoard: async (id) => {
    try {
      await axios.delete(`http://localhost:3001/boards/${id}`);
      return true;
    } catch (err) {
      console.error('게시글 삭제 실패:', err);
      return false;
    }
  },
}));

export default useBoardStore;
