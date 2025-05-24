import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888';

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
      updateUser: async (userData) => {
        const currentUser = get().user;
        if (!currentUser || !currentUser.userId) return;

        try {
          await axios.patch(`${API_BASE_URL}/api/members/${currentUser.userId}`, userData); // currentUser.id를 userId로 변경
          // 상태 업데이트
          set((state) => ({
            user: {
              ...state.user,
              ...userData,
            },
          }));
        } catch (error) {
          console.error('Failed to update user on server:', error);
        }
      },
      deleteUser: async () => {
        const currentUser = get().user;
        if (!currentUser || !currentUser.userId) return;

        try {
          await axios.delete(`${API_BASE_URL}/api/members/${currentUser.userId}`); // currentUser.id를 userId로 변경
          set({ user: null }); // 상태 초기화
        } catch (err) {
          console.log('계정 삭제 실패', err);
        }
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
