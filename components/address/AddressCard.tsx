import { cn } from "@/lib/utils";
import { Location01Icon } from "hugeicons-react";
import DeleteAddressAlertWithButton from "../dialoge/DeleteAddressAlertWithButton";
import SetAddressDefaultButton from "./SetAddressDefaultButton";

interface AddressProps {
  address: {
    _id?: string;
    full_name?: string;
    phone?: string;
    building?: string;
    colony?: string;
    region?: string;
    city?: string;
    area?: string;
    address?: string;
    label?: string;
    isDefault?: boolean;
  };
  deleteIcon?: boolean;
}

const AddressCard = ({ address, deleteIcon = true }: AddressProps) => {
  const {
    isDefault = false,
    _id = "",
    full_name = "",
    phone = "",
    building = "",
    colony = "",
    region = "",
    city = "",
    area = "",
    address: addressLine = "",
    label = "",
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
            {label && (
              <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {label}
              </span>
            )}
            {isDefault && (
              <span className="text-[10px] font-bold bg-[#003d29] text-white px-2 py-0.5 rounded-full">
                DEFAULT
              </span>
            )}
          </div>
          {phone && <p className="text-gray-600 text-sm mt-1">{phone}</p>}
          <p className="text-gray-600 text-sm">{building}</p>
          <p className="text-gray-600 text-sm">{colony}</p>
          <p className="text-gray-500 text-sm">
            {area}{area && city ? ", " : ""}{city}{city && region ? ", " : ""}{region}
          </p>
          {addressLine && <p className="text-gray-500 text-sm">{addressLine}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!isDefault && (
          <>
            <SetAddressDefaultButton text="Select Address" addressId={_id!} />
          </>
        )}
        {deleteIcon && <DeleteAddressAlertWithButton addressId={_id!} />}
      </div>
    </div>
  );
};

export default AddressCard;