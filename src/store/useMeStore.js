import { create } from "zustand";

export const useMeStore = create((set) => ({
  email: null,
  id: null,
  isLoading: true,
  setMe: ({ id, email }) => set({ id, email }),
  finishLoading: () => set({ isLoading: false }),
}));
