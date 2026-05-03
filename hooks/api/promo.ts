import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axios from "axios";

export interface ValidatePromoResponse {
  code: string;
  description?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  discount: number;
}

export const useValidatePromo = () => {
  return useMutation<
    ValidatePromoResponse,
    AxiosError<{ success: false; message: string }>,
    { code: string; subtotal: number; productIds?: string[]; categoryIds?: string[]; userId?: string | null }
  >({
    mutationFn: async ({ code, subtotal, productIds, categoryIds, userId }) => {
      const response = await axios.post("/api/promos/validate", {
        code,
        subtotal,
        productIds,
        categoryIds,
        userId,
      });
      return response.data.data;
    },
  });
};
