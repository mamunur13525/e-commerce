"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import AddressCard from "../address/AddressCard";
import AddAddressModalButton from "../address/AddAddressModalButton";

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

interface AddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addresses: Address[];
  isLoading?: boolean;
}

export function AddressModal({
  open,
  onOpenChange,
  addresses,
  isLoading = false,
}: AddressModalProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:min-w-xl px-4">
        <SheetHeader>
          <SheetTitle className="text-[#003d29]">
            Select Delivery Address
          </SheetTitle>
          <SheetDescription>
            Choose from your saved addresses or add a new one
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {isLoading ? (
            <div className="py-8 text-center">
              <p className="text-gray-500">Loading addresses...</p>
            </div>
          ) : addresses.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500 mb-4">No addresses saved yet</p>
              <AddAddressModalButton />
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((address) => (
                <AddressCard key={address._id!} address={address || {}} />
              ))}
              <Separator className="my-3" />
              <AddAddressModalButton />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
