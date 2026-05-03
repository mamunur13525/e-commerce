"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/hooks/api/queries";

interface CompareState {
  items: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

const MAX_COMPARE_ITEMS = 4;

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCompare: (product) => {
        const { items } = get();
        if (items.length >= MAX_COMPARE_ITEMS) {
          return; // Max 4 items
        }
        if (items.some((item) => item._id === product._id)) {
          return; // Already in compare
        }
        set({ items: [...items, product] });
      },
      removeFromCompare: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }));
      },
      clearCompare: () => {
        set({ items: [] });
      },
      isInCompare: (productId) => {
        return get().items.some((item) => item._id === productId);
      },
    }),
    {
      name: "compare-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
