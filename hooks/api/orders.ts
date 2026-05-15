import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useGetOrders(token: string | null, status?: string) {
  return useQuery({
    queryKey: ["orders", token, status],
    queryFn: async () => {
      const { data } = await axios.get("/api/account/orders", {
        params: { status },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    },
    enabled: !!token,
  });
}

export function useGetOrderDetails(orderId: string, token: string | null) {
  return useQuery({
    queryKey: ["orders", orderId, token],
    queryFn: async () => {
      const { data } = await axios.get(`/api/account/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    },
    enabled: !!token && !!orderId,
  });
}

export function useTrackOrder() {
  return useMutation({
    mutationFn: async ({ orderId, email }: { orderId: string; email: string }) => {
      const { data } = await axios.post("/api/track-order", {
        orderId,
        email,
      });
      return data.data;
    },
  });
}
