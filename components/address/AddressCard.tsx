import { cn } from "@/lib/utils";
import { Location01Icon } from "hugeicons-react";
import DeleteAddressAlertWithButton from "../dialoge/DeleteAddressAlertWithButton";
import SetAddressDefaultButton from "./SetAddressDefaultButton";

interface AddressProps {
  address: {
    city?: string;
    country?: string;
    full_name?: string;
    isDefault?: boolean;
    state?: string;
    street?: string;
    zip?: string;
    _id?: string;
  };
  deleteIcon?: boolean;
}

const AddressCard = ({ address, deleteIcon = true }: AddressProps) => {
  console.log({ address });
  const {
    isDefault = false,
    _id = "",
    city = "",
    state = "",
    zip = "",
    full_name = "",
    street = "",
  } = address;
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border transition-all",
        isDefault
          ? "border-[#aedf4d] bg-[#f7fdec]"
          : "border-gray-200 bg-white hover:border-gray-300",
      )}
    >
      <div className="flex items-start gap-4 mb-4 md:mb-0">
        <div
          className={cn(
            "p-2 rounded-full",
            isDefault
              ? "bg-[#aedf4d] text-[#003d29]"
              : "bg-gray-100 text-gray-500",
          )}
        >
          <Location01Icon className="size-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-[#003d29]">{full_name}</h4>
            {isDefault && (
              <span className="text-[10px] font-bold bg-[#003d29] text-white px-2 py-0.5 rounded-full">
                DEFAULT
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mt-1">{street}</p>
          <p className="text-gray-500 text-sm">
            {city}, {state} {zip}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!isDefault && (
          <>
            <SetAddressDefaultButton addressId={_id!} />
          </>
        )}
        {deleteIcon && <DeleteAddressAlertWithButton addressId={_id!} />}
      </div>
    </div>
  );
};

export default AddressCard;
