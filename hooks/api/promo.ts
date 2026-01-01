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
    { code: string; subtotal: number }
  >({
    mutationFn: async ({ code, subtotal }) => {
      const response = await axios.post("/api/promos/validate", {
        code,
        subtotal,
      });
      return response.data.data;
    },
  });
};
