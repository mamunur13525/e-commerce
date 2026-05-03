"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/lib/types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
        // Also store in localStorage for backward compatibility
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
          localStorage.setItem("userInfo", JSON.stringify(user));
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        // Also clear localStorage for backward compatibility
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
        }
      },
      updateUser: (updatedUser) =>
        set((state) => {
          const newUser = state.user ? { ...state.user, ...updatedUser } : null;
          if (newUser && typeof window !== "undefined") {
            localStorage.setItem("userInfo", JSON.stringify(newUser));
          }
          return { user: newUser };
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

