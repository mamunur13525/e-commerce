import { useQuery, useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";

export interface Review {
  _id: string;
  product: string;
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    image?: string;
  };
  rating: number;
  comment: string;
  images?: Array<{ url: string; id: string }>;
  createdAt: string;
}

export interface ReviewsResponse {
  success: boolean;
  data: Review[];
  pagination?: {
    total: number;
    page: number;
    pages: number;
    hasMore: boolean;
  };
}

export const useReviews = (
  productId: string, 
  rating?: number | string, 
  sort?: string, 
  page: number = 1, 
  limit: number = 10
): UseQueryResult<ReviewsResponse> => {
  return useQuery({
    queryKey: ["reviews", productId, rating, sort, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (rating) params.append("rating", rating.toString());
      if (sort) params.append("sort", sort);
      params.append("page", page.toString());
      params.append("limit", limit.toString());
      
      const res = await fetch(`/api/products/${productId}/reviews?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data: ReviewsResponse = await res.json();
      return data;
    },
    enabled: !!productId,
  });
};

export const useAddReview = (token: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, rating, comment, images }: { productId: string; rating: number; comment: string; images?: any[] }) => {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment, images }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add review");
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.productId] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.productId] });
    },
  });
};
