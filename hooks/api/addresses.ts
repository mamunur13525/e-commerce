import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Address {
  _id: string;
  full_name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface AddressesResponse {
  addresses: Address[];
  defaultAddress: Address | null;
}

export const useGetAddresses = (token: string | null) => {
  return useQuery<AddressesResponse>({
    queryKey: ["addresses", token],
    queryFn: async () => {
      if (!token) {
        return { addresses: [], defaultAddress: null };
      }

      const response = await axios.get("/api/account/addresses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
    enabled: !!token,
  });
};
