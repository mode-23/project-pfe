import { create } from "zustand";

export const useMeStore = create((set) => ({
  email: null,
  id: null,

  setMe: ({ id, email }) => set({ id, email }),
}));