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
import { Tick02Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";

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
  selectedAddress: Address | null;
  onSelectAddress: (address: Address) => void;
  isLoading?: boolean;
}

export function AddressModal({
  open,
  onOpenChange,
  addresses,
  selectedAddress,
  onSelectAddress,
  isLoading = false,
}: AddressModalProps) {
  const handleSelect = (address: Address) => {
    onSelectAddress(address);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-[#003d29]">Select Delivery Address</DialogTitle>
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
            <Button
              className="bg-[#003d29] hover:bg-[#002a1c]"
              onClick={() => {
                // Could navigate to add address page
                console.log("Add new address");
              }}
            >
              Add New Address
            </Button>
          </div>
        ) : (
          <div className="space-y-3 max-h-100 overflow-y-auto">
            {addresses.map((address) => (
              <div key={address._id}>
                <button
                  onClick={() => handleSelect(address)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border-2 transition-all",
                    selectedAddress?._id === address._id
                      ? "border-[#003d29] bg-[#003d29]/5"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-[#003d29]">
                          {address.full_name}
                        </p>
                        {address.isDefault && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {address.street}
                      </p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.state} {address.zip}
                      </p>
                      <p className="text-sm text-gray-500">
                        {address.country}
                      </p>
                    </div>
                    {selectedAddress?._id === address._id && (
                      <div className="shrink-0 mt-1">
                        <div className="w-5 h-5 bg-[#003d29] rounded-full flex items-center justify-center">
                          <Tick02Icon className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
                <Separator className="mt-3" />
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-[#003d29] hover:bg-[#002a1c]"
            disabled={!selectedAddress}
            onClick={() => {
              if (selectedAddress) {
                handleSelect(selectedAddress);
              }
            }}
          >
            Confirm Address
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
