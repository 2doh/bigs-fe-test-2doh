// userAuthStore.ts
import { create } from "zustand";

type UserAuthState = {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  isLoggedIn: boolean | null;
  setIsLoggedIn: (loggedIn: boolean) => void;
};

export const userAuthStore = create<UserAuthState>(set => ({
  accessToken: null,
  setAccessToken: token => set({ accessToken: token }),
  isLoggedIn: false || null,
  setIsLoggedIn: loggedIn => set({ isLoggedIn: loggedIn }),
}));
