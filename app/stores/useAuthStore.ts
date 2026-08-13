import { create } from "zustand";
import { User } from "../types/auth";

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  accessToken: null,
  setAuth: (user: User, accessToken: string) => set({ user, accessToken }),
  clearAuth: () => set({ user: null, accessToken: null }),
}));
