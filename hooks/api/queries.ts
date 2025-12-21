import { useQuery, useMutation, UseQueryResult, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import type { Filters } from "@/lib/types/filters";
import type { Metadata } from "@/lib/types/metadata";
import type { Address, AuthResponse, LoginCredentials, SignupCredentials, User } from "@/lib/types/auth";

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

// ============ AUTH MUTATIONS ============

/**
 * Sign up a new user
 */
export const useSignup = (): UseMutationResult<AuthResponse, Error, SignupCredentials> => {
  return useMutation({
    mutationFn: async (credentials: SignupCredentials) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Signup failed");
      }

      return data;
    },
  });
};

/**
 * Login with email and password
 */
export const useLogin = (): UseMutationResult<AuthResponse, Error, LoginCredentials> => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    },
  });
};

/**
 * Login with Google
 */
export const useGoogleLogin = (): UseMutationResult<AuthResponse, Error, {
  googleId: string;
  email: string;
  first_name?: string;
  last_name?: string;
  image?: string;
}> => {
  return useMutation({
    mutationFn: async (googleData: {
      googleId: string;
      email: string;
      first_name?: string;
      last_name?: string;
      image?: string;
    }) => {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(googleData),
      });

      const data: AuthResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Google login failed");
      }

      return data;
    },
  });
};

// ============ PROFILE QUERIES ============

export interface ProfileResponse {
  success: boolean;
  user: User;
  message?: string;
}

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
  phone?: string;
}

/**
 * Fetch user profile
 * @param token - Authentication token
 */
export const useProfile = (token: string | null): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: ["profile", token],
    queryFn: async () => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch("/api/account/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized");
        }
        throw new Error(`Failed to fetch profile: ${res.status}`);
      }

      const data: ProfileResponse = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      return data.user;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

/**
 * Update user profile
 * @param token - Authentication token
 */
export const useUpdateProfile = (token: string | null): UseMutationResult<ProfileResponse, Error, UpdateProfileData> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: UpdateProfileData) => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data: ProfileResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update profile");
      }

      return data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch profile query
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      // Update the query cache directly
      if (token) {
        queryClient.setQueryData(["profile", token], data.user);
      }
    },
  });
};

// ============ ADDRESS MUTATIONS ============

export interface AddAddressData {
  full_name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  isDefault?: boolean;
}

export interface AddAddressResponse {
  success: boolean;
  address: Address;
  message?: string;
}

export interface DeleteAddressResponse {
  success: boolean;
  message?: string;
}

export interface SetDefaultAddressResponse {
  success: boolean;
  address: Address;
  message?: string;
}

/**
 * Add a new address
 * @param token - Authentication token
 */
export const useAddAddress = (token: string | null): UseMutationResult<AddAddressResponse, Error, AddAddressData> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressData: AddAddressData) => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch("/api/account/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      const data: AddAddressResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add address");
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate profile query to refetch with new address
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

/**
 * Delete an address
 * @param token - Authentication token
 */
export const useDeleteAddress = (token: string | null): UseMutationResult<DeleteAddressResponse, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: string) => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch(`/api/account/addresses/${addressId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: DeleteAddressResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete address");
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate profile query to refetch without deleted address
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

/**
 * Set default address
 * @param token - Authentication token
 */
export const useSetDefaultAddress = (token: string | null): UseMutationResult<SetDefaultAddressResponse, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: string) => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch(`/api/account/addresses/${addressId}/default`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: SetDefaultAddressResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to set default address");
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate profile query to refetch with updated default address
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

// ============ PASSWORD MUTATIONS ============

export interface UpdatePasswordData {
  current_password: string;
  new_password: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}

/**
 * Update user password
 * @param token - Authentication token
 */
export const useUpdatePassword = (token: string | null): UseMutationResult<UpdatePasswordResponse, Error, UpdatePasswordData> => {
  return useMutation({
    mutationFn: async (passwordData: UpdatePasswordData) => {
      if (!token) {
        throw new Error("No authentication token");
      }

      const res = await fetch("/api/account/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      const data: UpdatePasswordResponse = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update password");
      }

      return data;
    },
  });
};

// ============ FORGOT PASSWORD MUTATIONS ============

export interface ForgotPasswordData {
  email: string;
}

export interface ForgotPasswordResponse {
  success?: boolean;
  message: string;
}

/**
 * Send password reset email
 */
export const useForgotPassword = (): UseMutationResult<ForgotPasswordResponse, Error, ForgotPasswordData> => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response: ForgotPasswordResponse = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "Failed to send reset email");
      }

      return response;
    },
  });
};

// ============ RESET PASSWORD MUTATIONS ============

export interface ResetPasswordData {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  success?: boolean;
  message: string;
}

/**
 * Reset password with token
 */
export const useResetPassword = (): UseMutationResult<ResetPasswordResponse, Error, ResetPasswordData> => {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response: ResetPasswordResponse = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "Failed to reset password");
      }

      return response;
    },
  });
};
