"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import AddressCard from "../address/AddressCard";
import AddAddressModalButton from "../address/AddAddressModalButton";

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-[#003d29]">
            Select Delivery Address
          </DialogTitle>
          <DialogDescription>
            Choose from your saved addresses or add a new one
          </DialogDescription>
        </DialogHeader>

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

        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className={"w-32"}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
