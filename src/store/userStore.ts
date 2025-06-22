// userAuthStore.ts
import { create } from "zustand";

type UserAuthState = {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
};

export const userAuthStore = create<UserAuthState>(set => ({
  accessToken: null,
  setAccessToken: token => set({ accessToken: token }),
}));
