import { useQuery, useMutation, useQueryClient, UseQueryResult } from "@tanstack/react-query";

export interface Comment {
  _id: string;
  product: string;
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    image?: string;
  };
  text: string;
  parentId: string | null;
  isVendor: boolean;
  createdAt: string;
}

export interface CommentsResponse {
  success: boolean;
  data: Comment[];
  pagination?: {
    total: number;
    page: number;
    pages: number;
    hasMore: boolean;
  };
}

export const useComments = (
  productId: string,
  page: number = 1,
  limit: number = 10
): UseQueryResult<CommentsResponse> => {
  return useQuery({
    queryKey: ["comments", productId, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());
      
      const res = await fetch(`/api/products/${productId}/comments?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data: CommentsResponse = await res.json();
      return data;
    },
    enabled: !!productId,
  });
};

export const useAddComment = (token: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, text, parentId }: { productId: string; text: string; parentId?: string | null }) => {
      const res = await fetch(`/api/products/${productId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, parentId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add comment");
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.productId] });
    },
  });
};
