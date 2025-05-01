import { create } from 'zustand';

// 유저정보 관리
const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

export default useUserStore;
