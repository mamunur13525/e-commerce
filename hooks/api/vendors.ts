import { useQuery, useInfiniteQuery, UseQueryResult } from "@tanstack/react-query";
import type { Product } from "./queries";

// ============ VENDOR TYPES ============

export interface Vendor {
  _id: string;
  vendorId: string;
  storeName: string;
  description?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  website?: string;
  logo?: {
    url?: string;
    display_url?: string;
  };
  vendorStatus: "approved" | "rejected" | "pending";
  commissionRate: number;
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  rating: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface VendorsResponse {
  success: boolean;
  data: Vendor[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    hasMore: boolean;
  };
}

export interface VendorResponse {
  success: boolean;
  data: Vendor;
}

export interface VendorProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    hasMore: boolean;
  };
}

// ============ VENDOR QUERIES ============

/**
 * Fetch all vendors with pagination
 */
export const useVendors = ({
  status,
  limit = 12,
  page = 1,
}: {
  status?: string;
  limit?: number;
  page?: number;
} = {}): UseQueryResult<VendorsResponse> => {
  return useQuery({
    queryKey: ["vendors", status, limit, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("limit", limit.toString());
      params.append("page", page.toString());
      if (status) {
        params.append("status", status);
      }

      const res = await fetch(`/api/vendors?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch vendors: ${res.status}`);
      }
      const data: VendorsResponse = await res.json();
      if (!data.success) {
        throw new Error("Failed to fetch vendors");
      }
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};

/**
 * Fetch a single vendor by ID
 */
export const useVendor = (vendorId: string): UseQueryResult<Vendor> => {
  return useQuery({
    queryKey: ["vendor", vendorId],
    queryFn: async () => {
      if (!vendorId) throw new Error("Vendor ID is required");

      const res = await fetch(`/api/vendors/${vendorId}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Vendor not found");
        }
        throw new Error(`Failed to fetch vendor: ${res.status}`);
      }
      const data: VendorResponse = await res.json();
      if (!data.success) {
        throw new Error("Failed to fetch vendor");
      }
      return data.data;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    enabled: !!vendorId,
  });
};

/**
 * Fetch vendor products with infinite scroll
 */
export const useVendorProducts = ({
  vendorId,
  limit = 12,
}: {
  vendorId: string;
  limit?: number;
}) => {
  return useInfiniteQuery({
    queryKey: ["vendor_products", vendorId, limit],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams();
      params.append("limit", limit.toString());
      params.append("page", pageParam.toString());

      const res = await fetch(`/api/vendors/${vendorId}/products?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch vendor products: ${res.status}`);
      }
      const data: VendorProductsResponse = await res.json();
      if (!data.success) {
        throw new Error("Failed to fetch vendor products");
      }
      return data;
    },
    getNextPageParam: (lastPage: VendorProductsResponse) => {
      if (lastPage.pagination && lastPage.pagination.hasMore) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!vendorId,
  });
};
