"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useValidatePromo } from "@/hooks/api/promo";
import { toast } from "sonner";

interface PromoCodeInputProps {
  subtotal: number;
  appliedPromo: {
    code: string;
    discount: number;
    description?: string;
  } | null;
  onApplyPromo: (promo: {
    code: string;
    discount: number;
    description?: string;
  }) => void;
  onRemovePromo: () => void;
  productIds?: string[];
  categoryIds?: string[];
  userId?: string | null;
}

export function PromoCodeInput({
  subtotal,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
  productIds,
  categoryIds,
  userId,
}: PromoCodeInputProps) {
  const [promoCode, setPromoCode] = useState("");
  const validatePromoMutation = useValidatePromo();

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    try {
      const result = await validatePromoMutation.mutateAsync({
        code: promoCode,
        subtotal,
        productIds,
        categoryIds,
        userId,
      });

      onApplyPromo({
        code: result.code,
        discount: result.discount,
        description: result.description,
      });

      toast.success(
        `Promo code applied! Discount: $${result.discount.toFixed(2)}`,
      );
      setPromoCode("");
    } catch (error) {
      let message = "Invalid promo code";
      if (axios.isAxiosError(error) && error.response?.data) {
        message = error.response.data.message || message;
      }
      toast.error(message);
    }
  };

  if (appliedPromo) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="font-semibold text-green-700">{appliedPromo.code}</p>
          <p className="text-sm text-green-600">
            {appliedPromo.description || "Promo applied"}
          </p>
        </div>
        <button
          onClick={onRemovePromo}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Add Promo"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
        className="w-full bg-gray-100 rounded-full py-3 px-5 text-sm outline-none focus:ring-2 focus:ring-[#003d29]/20"
      />
      <Button
        onClick={handleApplyPromo}
        disabled={validatePromoMutation.isPending}
        className="absolute right-1 top-1 rounded-full bg-[#003d29] hover:bg-[#002a1c] h-auto py-2 px-6"
      >
        {validatePromoMutation.isPending ? "..." : "Apply"}
      </Button>
    </div>
  );
}