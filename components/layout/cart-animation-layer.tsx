"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCartAnimation, AnimationItem } from "@/components/context/cart-animation-context";

// Individual flying image component to handle its own lifecycle
const FlyingImage = ({
    item,
    targetRect,
    onComplete,
}: {
    item: AnimationItem;
    targetRect: DOMRect;
    onComplete: (id: number) => void;
}) => {
    const [styles, setStyles] = useState({
        x: item.startRect.left,
        y: item.startRect.top,
        width: item.startRect.width,
        height: item.startRect.height,
        opacity: 1,
        scale: 1,
        borderRadius: "8px",
    });

    useEffect(() => {
        // Force a reflow/repaint to set initial position
        requestAnimationFrame(() => {
            // slight delay to ensure the browser registers the starting position
            setTimeout(() => {
                setStyles({
                    x: targetRect.left + (targetRect.width / 2) - 20,
                    y: targetRect.top + (targetRect.height / 2) - 20,
                    width: 40,
                    height: 40,
                    opacity: 0.5,
                    scale: 0.5, // Shrink effect via scale sometimes looks smoother
                    borderRadius: "50%",
                });
            }, 50);
        });

        const timer = setTimeout(() => {
            onComplete(item.id);
        }, 850);

        return () => clearTimeout(timer);
    }, [item, targetRect, onComplete]);

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 9999,
                // X-Axis Motion: Slower start than Y, but not too slow.
                transform: `translateX(${styles.x}px)`,
                transition: "transform 0.8s cubic-bezier(0.2, 0, 0.2, 1)", // Gentler ease-in-out
            }}
        >
            <div
                style={{
                    // Y-Axis Motion: Fast start (jump), but closer to X to reduce loop size
                    transform: `translateY(${styles.y}px)`,
                    transition: "transform 0.8s cubic-bezier(0.1, 0.8, 0.1, 1)",
                }}
            >
                <div
                    style={{
                        width: styles.width,
                        height: styles.height,
                        opacity: styles.opacity,
                        borderRadius: styles.borderRadius,
                        transition: "all 0.8s ease",
                    }}
                >
                    <Image
                        src={item.imageSrc}
                        alt="flying-product"
                        fill
                        className="object-contain"
                        sizes="200px"
                    />
                </div>
            </div>
        </div>
    );
};


export function CartAnimationLayer() {
    const { cartIconRef, animatingItems, removeAnimationItem } = useCartAnimation();
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    // Update target rect on mount and resize
    useEffect(() => {
        const updateRect = () => {
            if (cartIconRef.current) {
                setTargetRect(cartIconRef.current.getBoundingClientRect());
            }
        };

        updateRect();
        window.addEventListener("resize", updateRect);
        window.addEventListener("scroll", updateRect); // In case navbar changes position (though it's sticky)

        return () => {
            window.removeEventListener("resize", updateRect);
            window.removeEventListener("scroll", updateRect);
        };
    }, [cartIconRef, animatingItems]); // Re-check when items are added in case ref wasn't ready


    // If no target, we can't really animate properly, but we won't crash.
    // Ideally, if no target, maybe just fade out in place?
    if (!targetRect || animatingItems.length === 0) return null;

    return (
        <>
            {animatingItems.map((item) => (
                <FlyingImage
                    key={item.id}
                    item={item}
                    targetRect={targetRect}
                    onComplete={removeAnimationItem}
                />
            ))}
        </>
    );
}
