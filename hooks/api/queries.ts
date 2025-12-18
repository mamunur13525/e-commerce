import { useQuery, UseQueryResult } from "@tanstack/react-query";
import type { Filters } from "@/lib/types/filters";
import type { Metadata } from "@/lib/types/metadata";

// ============ PRODUCTS QUERIES ============

export interface Product {
  _id: string;
  name: string;
  description: string;
  weight: string;
  price: number;
  image: {
    url: string;
    display_url?: string;
  };
  images?: any[];
  category: string;
  rating?: number;
  discount?: number;
  currency?: string;
  quantity?: number;
  store?:
    | {
        id?: string;
        name?: string;
      }
    | string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
}

export interface ProductResponse {
  success: boolean;
  data: Product;
}

/**
 * Fetch products with optional filters
 * @param category - Filter by category (optional)
 * @param limit - Limit number of results (default: 10)
 */
export const useProducts = (
  category?: string,
  limit: number = 10
): UseQueryResult<Product[]> => {
  return useQuery({
    queryKey: ["products", category, limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("limit", limit.toString());
      if (category && category !== "All") {
        params.append("category", category);
      }

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
      }
      const data: ProductsResponse = await res.json();
      if (!data.success) {
        throw new Error(data.data ? "Failed to fetch products" : "No products found");
      }
      return data.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (previously cacheTime)
  });
};

/**
 * Fetch single product by ID
 * @param productId - The product ID to fetch
 */
export const useProduct = (productId: string): UseQueryResult<Product | null> => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) return null;

      const res = await fetch(`/api/products/${productId}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Product not found");
        }
        throw new Error(`Failed to fetch product: ${res.status}`);
      }
      const result: ProductResponse = await res.json();
      if (!result.success) {
        throw new Error(result as any);
      }
      return result.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    enabled: !!productId,
  });
};

// ============ CATEGORIES QUERIES ============

export interface Category {
  _id?: string;
  slug: string;
  name: string;
  subtitle?: string;
  color?: string;
  icon?: string;
  count?: number;
}

/**
 * Fetch all categories
 */
export const useCategories = (): UseQueryResult<Category[]> => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status}`);
      }
      const data: Category[] = await res.json();
      return Array.isArray(data) ? data : [];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 120, // 2 hours
  });
};

// ============ FILTERS QUERIES ============

/**
 * Fetch filters (categories with counts and price range)
 */
export const useFilters = (): UseQueryResult<Filters> => {
  return useQuery({
    queryKey: ["filters"],
    queryFn: async () => {
      const res = await fetch("/api/filters");
      if (!res.ok) {
        throw new Error(`Failed to fetch filters: ${res.status}`);
      }
      const data: Filters = await res.json();
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 120, // 2 hours
  });
};

// ============ METADATA QUERIES ============

/**
 * Fetch metadata (hero sliders, offers, discount cards, etc.)
 */
export const useMetadata = (): UseQueryResult<Metadata> => {
  return useQuery({
    queryKey: ["metadata"],
    queryFn: async () => {
      const res = await fetch("/api/metadata");
      if (!res.ok) {
        throw new Error(`Failed to fetch metadata: ${res.status}`);
      }
      const data: Metadata = await res.json();
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 120, // 2 hours
  });
};
