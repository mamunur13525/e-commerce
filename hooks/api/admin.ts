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
  discountType?: "amount" | "percentage";
  currency: string;
  image: any;
  images: any[];
  sizes?: string[];
  colors?: Array<{ name: string; code: string }>;
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

export interface DeliveryAddress {
  full_name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
}

export interface OrderItem {
  product?: {
    _id: string;
    name: string;
    images?: Array<{ display_url: string }>;
  };
  variant?: string;
  price: number;
  quantity: number;
}

export interface AdminOrder {
  _id: string;
  orderId: string;
  user?: { _id: string; first_name: string; last_name: string; email: string };
  guestInfo?: { name: string; email: string; phone: string };
  items: OrderItem[];
  deliveryAddress: DeliveryAddress;
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

// ============ PROMOS ============

export interface AdminPromo {
  _id: string;
  code: string;
  description?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  maxDiscount?: number | null;
  minOrderAmount: number;
  maxUsageCount?: number | null;
  usageCount: number;
  expiryDate: string;
  isActive: boolean;
  applicableToFirstOrder: boolean;
  specificProductIds: string[];
  specificCategoryIds: string[];
  usedBy: any[];
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export function useAdminPromos(params?: {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: string;
}) {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["admin", "promos", token, params],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/promos", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      return data as PaginatedResponse<AdminPromo>;
    },
    enabled: !!token,
  });
}

export function useCreatePromo() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (promoData: any) => {
      const { data } = await axios.post("/api/admin/promos", promoData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "promos"] });
    },
  });
}

export function useUpdatePromo() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...promoData }: any) => {
      const { data } = await axios.put(`/api/admin/promos/${id}`, promoData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "promos"] });
    },
  });
}

export function useDeletePromo() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/admin/promos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "promos"] });
    },
  });
}


// ============ CATEGORIES ============

export interface AdminCategory {
  _id: string;
  type: string;
  name: string;
  subtitle: string;
  color: string;
  icon: string;
  slug?: string;
  count: number;
  createdAt: string;
  updatedAt: string;
}

export function useAdminCategories() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["admin", "categories", token],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data as { success: boolean; data: AdminCategory[] };
    },
    enabled: !!token,
  });
}

export function useCreateCategory() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryData: any) => {
      const { data } = await axios.post("/api/admin/categories", categoryData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
    },
  });
}

export function useUpdateCategory() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...categoryData }: any) => {
      const { data } = await axios.put(`/api/admin/categories/${id}`, categoryData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
    },
  });
}

export function useDeleteCategory() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/admin/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
    },
  });
}

// ============ METADATA ============

export interface AdminMetadata {
  _id: string;
  hero_slider: Array<{
    image_url: string;
    link?: string;
  }>;
  offers: Array<{
    _id: string;
    sub_title: string;
    title: string;
    description: string;
    product_image: string;
    primary_color: string;
    secondary_color: string;
  }>;
  discout_cards: Array<{
    _id: string;
    type: string;
    icon: string;
    title: string;
    description: string;
    bg_color: string;
    cta_btn: { color: string; text: string; bg_color: string; link: string };
  }>;
  createdAt: string;
  updatedAt: string;
}

export function useAdminMetadata() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["admin", "metadata", token],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/metadata", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data as AdminMetadata;
    },
    enabled: !!token,
  });
}

export function useUpdateMetadata() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (metadataData: any) => {
      const { data } = await axios.put("/api/admin/metadata", metadataData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "metadata"] });
    },
  });
}

// ============ DELIVERY ZONES ============

export interface AdminDeliveryZone {
  _id: string;
  name: string;
  city: string;
  allRemaining: boolean;
  fee: number;
  estimatedDelivery: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export function useAdminDeliveryZones(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["admin", "delivery-zones", token, params],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/delivery-zones", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      return data as PaginatedResponse<AdminDeliveryZone>;
    },
    enabled: !!token,
  });
}

export function useCreateDeliveryZone() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (zoneData: any) => {
      const { data } = await axios.post("/api/admin/delivery-zones", zoneData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "delivery-zones"] });
    },
  });
}

export function useUpdateDeliveryZone() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...zoneData }: any) => {
      const { data } = await axios.put(`/api/admin/delivery-zones/${id}`, zoneData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "delivery-zones"] });
    },
  });
}

export function useDeleteDeliveryZone() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`/api/admin/delivery-zones/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "delivery-zones"] });
    },
  });
}

// ============ SETTINGS ============

export interface AdminSettings {
  _id: string;
  onlinePaymentDiscount: {
    type: "percentage" | "fixed";
    value: number;
  };
  createdAt: string;
  updatedAt: string;
}

export function useAdminSettings() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["admin", "settings", token],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/settings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.data as AdminSettings;
    },
    enabled: !!token,
  });
}

export function useUpdateSettings() {
  const token = useAuthStore((s) => s.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settingsData: any) => {
      const { data } = await axios.put("/api/admin/settings", settingsData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
    },
  });
}

