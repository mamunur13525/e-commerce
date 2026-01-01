"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { ButtonHTMLAttributes } from "react";
import { Loading03Icon, PlusSignIcon, Remove01Icon } from "hugeicons-react";
import { useAuthStore } from "@/store/auth-store";
import { useAuthModalStore } from "@/store/auth-modal-store";
import { useAddToCart, useUpdateCartItem } from "@/hooks";
import { useCartAnimation } from "@/components/context/cart-animation-context";
import { toast } from "sonner";

interface AddToCartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  productId: string;
  imageSrc?: string;
  onAddToCart?: () => void;
  variant?: "inline" | "compact";
  flyOriginRef?: React.RefObject<HTMLElement | null>;
}

export function AddToCartButton({
  productId,
  imageSrc = "",
  onAddToCart,
  variant = "inline",
  flyOriginRef,
  ...buttonProps
}: AddToCartButtonProps) {
  const [cartQuantity, setCartQuantity] = useState(0);
  const { isAuthenticated, token } = useAuthStore();
  const { openAuthModal } = useAuthModalStore();
  const addToCartMutation = useAddToCart(isAuthenticated ? token : null);
  const updateCartMutation = useUpdateCartItem(isAuthenticated ? token : null);
  const { startAnimation } = useCartAnimation();
  const imageRef = useRef<HTMLImageElement>(null);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    try {
      await addToCartMutation.mutateAsync({
        productId,
        quantity: 1,
      });

      const targetRef = flyOriginRef || imageRef;
      if (imageSrc && targetRef?.current) {
        const rect = targetRef.current.getBoundingClientRect();
        console.log({ imageSrc })
        startAnimation(imageSrc, rect);
      }

      setCartQuantity(1);
      toast.success("Added to cart!");
      onAddToCart?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add to cart"
      );
    }
  };

  const handleIncrement = async () => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    try {
      const newQuantity = cartQuantity + 1;
      await updateCartMutation.mutateAsync({
        productId,
        quantity: newQuantity,
      });

      const targetRef = flyOriginRef || imageRef;
      if (cartQuantity === 0 && imageSrc && targetRef?.current) {
        const rect = targetRef.current.getBoundingClientRect();
        startAnimation(imageSrc, rect);
      }

      setCartQuantity(newQuantity);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update cart"
      );
    }
  };

  const handleDecrement = async () => {
    try {
      const newQuantity = Math.max(0, cartQuantity - 1);
      await updateCartMutation.mutateAsync({
        productId,
        quantity: newQuantity,
      });
      setCartQuantity(newQuantity);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update cart"
      );
    }
  };

  if (variant === "compact") {
    if (cartQuantity === 0) {
      return (
        <>
          <Button
            onClick={handleAddToCart}
            disabled={addToCartMutation.isPending}
            {...buttonProps}
          >
            {
              addToCartMutation.isPending ? (
                <Loading03Icon className="size-4 animate-spin" />
              ) : (
                'Add to Cart'
              )
            }
          </Button>
          {/* Hidden image for animation fallback */}
          <img ref={imageRef} src={imageSrc} className="fixed opacity-0 pointer-events-none size-1" alt="" />
        </>
      );
    }

    return (
      <div className="flex items-center justify-between bg-[#d4e157] rounded-lg p-1 shadow-inner w-full overflow-hidden h-10">
        <Button
          onClick={handleDecrement}
          disabled={updateCartMutation.isPending}
          className="px-3 h-full bg-white/30 hover:bg-white/50 disabled:opacity-50 text-[#003d29] transition-colors flex items-center justify-center"
        >
          {
            updateCartMutation.isPending ? (
              <Loading03Icon className="size-4 animate-spin" />
            ) : (
              <Remove01Icon className="size-4" />
            )
          }
        </Button>
        <span className="font-bold text-sm text-[#003d29]">{cartQuantity}</span>
        <Button
          onClick={handleIncrement}
          disabled={updateCartMutation.isPending}
          className="px-3 h-full bg-white/30 hover:bg-white/50 disabled:opacity-50 text-[#003d29] transition-colors flex items-center justify-center"
        >
          {
            updateCartMutation.isPending ? (
              <Loading03Icon className="size-4 animate-spin" />
            ) : (
              <PlusSignIcon className="size-4" />
            )
          }
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={handleAddToCart}
        disabled={addToCartMutation.isPending}
        {...buttonProps}
      >
        {
          addToCartMutation.isPending ? (
            <Loading03Icon className="size-4 animate-spin" />
          ) : (
            'Add to Cart'
          )
        }

      </Button>
      {/* Hidden image for animation fallback */}
      <img ref={imageRef} src={imageSrc} className="fixed opacity-0 pointer-events-none size-1" alt="" />
    </>
  );
}
