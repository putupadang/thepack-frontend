import { create } from "zustand";

interface AuthState {
  token: string;
  setToken: (value: string) => void;
}

const useAuth = create<AuthState>((set) => ({
  token: "",
  setToken: (value: string) => set({ token: value }),
}));

export default useAuth;
