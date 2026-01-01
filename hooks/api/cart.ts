import { useMutation, useQuery, useQueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export interface ProductDetails {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: {
    url?: string;
    display_url?: string;
  };
  rating?: number;
  discount?: number;
  currency?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product?: ProductDetails;
}

export interface CartResponse {
  success: boolean;
  data: CartItem[];
  message?: string;
}

export interface CartMutationResponse {
  success: boolean;
  data: CartItem[];
  message?: string;
}

/**
 * Fetch user's cart
 * @param token - Authentication token
 */
export const useGetCart = (token: string | null): UseQueryResult<CartItem[], Error> => {
  return useQuery({
    queryKey: ["cart", token],
    queryFn: async () => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized");
        }
        throw new Error(`Failed to fetch cart: ${res.status}`);
      }

      const data: CartResponse = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch cart");
      }

      return data.data || [];
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 1, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Add item to cart
 * @param token - Authentication token
 */
export const useAddToCart = (token: string | null): UseMutationResult<CartMutationResponse, Error, { productId: string; quantity?: number }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { productId: string; quantity?: number }) => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: data.productId,
          quantity: data.quantity || 1,
        }),
      });

      const response: CartMutationResponse = await res.json();

      if (!res.ok || !response.success) {
        throw new Error(response.message || "Failed to add to cart");
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      if (token) {
        queryClient.setQueryData(["cart", token], []);
      }
    },
  });
};

/**
 * Update cart item quantity
 * @param token - Authentication token
 */
export const useUpdateCartItem = (token: string | null): UseMutationResult<CartMutationResponse, Error, { productId: string; quantity: number }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { productId: string; quantity: number }) => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const response: CartMutationResponse = await res.json();

      if (!res.ok || !response.success) {
        throw new Error(response.message || "Failed to update cart");
      }

      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      if (token) {
        queryClient.setQueryData(["cart", token], data.data || []);
      }
    },
  });
};

/**
 * Remove item from cart
 * @param token - Authentication token
 */
export const useRemoveFromCart = (token: string | null): UseMutationResult<CartMutationResponse, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch(`/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response: CartMutationResponse = await res.json();

      if (!res.ok || !response.success) {
        throw new Error(response.message || "Failed to remove from cart");
      }

      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      if (token) {
        queryClient.setQueryData(["cart", token], data.data || []);
      }
    },
  });
};

/**
 * Clear entire cart
 * @param token - Authentication token
 */
export const useClearCart = (token: string | null): UseMutationResult<CartMutationResponse, Error, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response: CartMutationResponse = await res.json();

      if (!res.ok || !response.success) {
        throw new Error(response.message || "Failed to clear cart");
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      if (token) {
        queryClient.setQueryData(["cart", token], []);
      }
    },
  });
};
