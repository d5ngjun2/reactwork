import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
      updateUser: async (userData) => {
        const currentUser = get().user;
        if (!currentUser || !currentUser.id) return;

        try {
          await axios.patch(`http://localhost:3001/users/${currentUser.id}`, userData);
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
        if (!currentUser || !currentUser.id) return;

        try {
          await axios.delete(`http://localhost:3001/users/${currentUser.id}`);
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
