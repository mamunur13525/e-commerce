"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";

export interface AnimationItem {
    id: number;
    imageSrc: string;
    startRect: DOMRect;
}

interface CartAnimationContextType {
    startAnimation: (imageSrc: string, startRect: DOMRect) => void;
    registerCartIcon: (element: HTMLElement | null) => void;
    cartIconRef: React.RefObject<HTMLElement | null>;
    animatingItems: AnimationItem[];
    removeAnimationItem: (id: number) => void;
}

const CartAnimationContext = createContext<CartAnimationContextType | undefined>(undefined);

export function CartAnimationProvider({ children }: { children: React.ReactNode }) {
    const [animatingItems, setAnimatingItems] = useState<AnimationItem[]>([]);
    const cartIconRef = useRef<HTMLElement | null>(null);

    const startAnimation = useCallback((imageSrc: string, startRect: DOMRect) => {
        const id = Date.now() + Math.random();
        setAnimatingItems((prev) => [...prev, { id, imageSrc, startRect }]);
    }, []);

    const removeAnimationItem = useCallback((id: number) => {
        setAnimatingItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const registerCartIcon = useCallback((element: HTMLElement | null) => {
        cartIconRef.current = element;
    }, []);

    return (
        <CartAnimationContext.Provider
            value={{
                startAnimation,
                registerCartIcon,
                cartIconRef,
                animatingItems,
                removeAnimationItem,
            }}
        >
            {children}
        </CartAnimationContext.Provider>
    );
}

export function useCartAnimation() {
    const context = useContext(CartAnimationContext);
    if (!context) {
        throw new Error("useCartAnimation must be used within a CartAnimationProvider");
    }
    return context;
}
