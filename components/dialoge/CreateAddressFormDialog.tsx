import { Location01Icon, UserIcon } from "hugeicons-react";
import { FloatingInput } from "../ui/floating-input";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countries } from "@/lib/countries";
import { toast } from "sonner";
import { useAddAddress } from "@/hooks";
import { useAuthStore } from "@/store/auth-store";

// Address Form Dialog Component
function CreateAddressFormDialog({ onCancel }: { onCancel: () => void }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "Bangladesh",
      isDefault: false,
    },
  });
  const { token } = useAuthStore();

  const addAddressMutation = useAddAddress(token);

  const handleAddAddress = async (addressForm: any) => {
    if (
      !addressForm.full_name ||
      !addressForm.street ||
      !addressForm.city ||
      !addressForm.state ||
      !addressForm.zip
    ) {
      toast.error("Please fill in all address fields");
      return;
    }

    try {
      await addAddressMutation.mutateAsync(addressForm);
      onCancel();
      toast.success("Address added successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to add address");
    }
  };
  const handleFormSubmit = (data: any) => {
    handleAddAddress(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid gap-4 py-4">
        <div>
          <FloatingInput
            id="address-full-name"
            label="Full Name"
            {...register("full_name", { required: "Full name is required" })}
            startIcon={<UserIcon className="size-5" />}
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.full_name.message as string}
            </p>
          )}
        </div>
        <div>
          <FloatingInput
            id="address-street"
            label="Street Address"
            {...register("street", { required: "Street address is required" })}
            startIcon={<Location01Icon className="size-5" />}
          />
          {errors.street && (
            <p className="text-red-500 text-sm mt-1">
              {errors.street.message as string}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FloatingInput
              id="address-city"
              label="City"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.city.message as string}
              </p>
            )}
          </div>
          <div>
            <FloatingInput
              id="address-state"
              label="State"
              {...register("state", { required: "State is required" })}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FloatingInput
              id="address-zip"
              label="ZIP Code"
              {...register("zip", { required: "ZIP code is required" })}
            />
            {errors.zip && (
              <p className="text-red-500 text-sm mt-1">
                {errors.zip.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col  w-full">
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    id="address-country"
                    className="h-[55px]! shadow-none w-full text-base border-input dark:bg-input/30 rounded-lg"
                  >
                    <SelectValue>
                      {field.value || "Select a country"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="address-default"
            {...register("isDefault")}
            className="size-4"
          />
          <label htmlFor="address-default" className="text-sm text-gray-700">
            Set as default address
          </label>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={addAddressMutation.isPending}
          className="bg-[#003d29] hover:bg-[#002a1c] text-white"
        >
          {addAddressMutation.isPending ? "Adding..." : "Add Address"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default CreateAddressFormDialog;
