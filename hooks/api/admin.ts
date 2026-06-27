"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

// ============ DASHBOARD ============

export interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  processingOrders: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentOrders: any[];
  monthlyRevenue: any[];
}

export function useAdminDashboard() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["admin", "dashboard", token],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data as DashboardData;
    },
    enabled: !!token,
  });
}

// ============ PRODUCTS ============

export interface AdminProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  final_price: number;
  quantity: number;
  weight: string;
  rating: number;
  category: string;
  discount: number;
  currency: string;
  image: any;
  images: any[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    hasMore: boolean;
  };
}

export function useAdminProducts(params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}) {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["admin", "products", token, params],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/products", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      return data as PaginatedResponse<AdminProduct>;
    },
    enabled: !!token,
  });
}

export function useCreateProduct() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: any) => {
      const { data } = await axios.post("/api/admin/products", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });
}

export function useUpdateProduct() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...productData }: any) => {
      const { data } = await axios.put(`/api/admin/products/${id}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });
}

export function useDeleteProduct() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });
}

// ============ USERS ============

export interface AdminUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  image: string;
  role: string;
  googleId?: string;
  createdAt: string;
  updatedAt: string;
}

export function useAdminUsers(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["admin", "users", token, params],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/users", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      return data as PaginatedResponse<AdminUser>;
    },
    enabled: !!token,
  });
}

export function useDeleteUser() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

// ============ ORDERS ============

export interface AdminOrder {
  _id: string;
  orderId: string;
  user?: { _id: string; first_name: string; last_name: string; email: string };
  guestInfo?: { name: string; email: string; phone: string };
  items: any[];
  deliveryAddress: any;
  subtotal: number;
  deliveryFee: number;
  promoDiscount: number;
  taxes: number;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  cancelNote?: string;
  createdAt: string;
  updatedAt: string;
}

export function useAdminOrder(id: string | null) {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["admin", "order", id, token],
    queryFn: async () => {
      const { data } = await axios.get(`/api/admin/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data as AdminOrder;
    },
    enabled: !!token && !!id,
  });
}

export function useAdminOrders(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
  paymentStatus?: string;
}) {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["admin", "orders", token, params],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/orders", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      return data as PaginatedResponse<AdminOrder>;
    },
    enabled: !!token,
  });
}

export function useUpdateOrderStatus() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
      paymentStatus,
      cancelNote,
    }: {
      id: string;
      status?: string;
      paymentStatus?: string;
      cancelNote?: string;
    }) => {
      const { data } = await axios.put(
        `/api/admin/orders/${id}/status`,
        { status, paymentStatus, cancelNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
  });
}