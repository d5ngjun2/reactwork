import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 유저정보 관리
const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // localStorage에 저장될 key 이름
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
