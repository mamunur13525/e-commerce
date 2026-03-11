import { useMutation, useQuery, useQueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { Product } from "./queries";

export interface WishlistResponse {
  success: boolean;
  data: Product[];
  message?: string;
}

/**
 * Fetch user's wishlist
 */
export const useGetWishlist = (token: string | null): UseQueryResult<Product[], Error> => {
  return useQuery({
    queryKey: ["wishlist", token],
    queryFn: async () => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch("/api/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized");
        }
        throw new Error(`Failed to fetch wishlist: ${res.status}`);
      }

      const data: WishlistResponse = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch wishlist");
      }

      return data.data || [];
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

/**
 * Add item to wishlist
 */
export const useAddToWishlist = (token: string | null): UseMutationResult<WishlistResponse, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const response: WishlistResponse = await res.json();

      if (!res.ok || !response.success) {
        throw new Error(response.message || "Failed to add to wishlist");
      }

      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      if (token) {
        queryClient.setQueryData(["wishlist", token], data.data || []);
      }
    },
  });
};

/**
 * Remove item from wishlist
 */
export const useRemoveFromWishlist = (token: string | null): UseMutationResult<WishlistResponse, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch(`/api/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response: WishlistResponse = await res.json();

      if (!res.ok || !response.success) {
        throw new Error(response.message || "Failed to remove from wishlist");
      }

      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      if (token) {
        queryClient.setQueryData(["wishlist", token], data.data || []);
      }
    },
  });
};
