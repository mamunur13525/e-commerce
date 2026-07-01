import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Address {
  _id: string;
  full_name: string;
  phone: string;
  building: string;
  colony: string;
  region: string;
  city: string;
  area: string;
  address: string;
  label: string;
  isDefault: boolean;
}

export type AddressesResponse = Address[]

export const useGetAddresses = (token: string | null) => {
  return useQuery<AddressesResponse>({
    queryKey: ["addresses", token],
    queryFn: async () => {
      if (!token) {
        return { addresses: [], defaultAddress: null };
      }

      const response = await axios.get(`/api/account/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log({response})
      if(response.data.success){
        return response.data.addresses;
      }
      return { addresses: [], defaultAddress: null };
    },
    enabled: !!token,
  });
};