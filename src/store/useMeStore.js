import { create } from "zustand";

export const useMeStore = create((set) => ({
  email: null,
  id: null,
  deletedAt: null,
  createdAt: null,
  isLoading: true,
  setMe: ({ id, email, deletedAt, createdAt }) =>
    set({ id, email, deletedAt, createdAt }),
  finishLoading: () => set({ isLoading: false }),
}));
