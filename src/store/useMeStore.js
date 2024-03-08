import { create } from "zustand";

export const useMeStore = create((set) => ({
  email: null,
  id: null,
  deletedAt: null,
  createdAt: null,
  role: null,
  isLoading: true,
  setMe: ({ id, email, deletedAt, createdAt, role }) =>
    set({ id, email, deletedAt, createdAt, role }),
  finishLoading: () => set({ isLoading: false }),
}));
