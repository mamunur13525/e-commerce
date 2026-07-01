import {
  UserIcon,
  TelephoneIcon,
  Home01Icon,
  Location01Icon,
  MapPinIcon,
  Building03Icon,
} from "hugeicons-react";
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
import { toast } from "sonner";
import { useAddAddress } from "@/hooks";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
import {
  getRegions,
  getCitiesByRegion,
  getAreasByCity,
} from "@/lib/locations";

interface AddressFormData {
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

// Address Form Dialog Component
function CreateAddressFormDialog({ onCancel }: { onCancel: () => void }) {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const regions = getRegions();
  const cities = selectedRegion ? getCitiesByRegion(selectedRegion) : [];
  const areas = selectedRegion && selectedCity ? getAreasByCity(selectedRegion, selectedCity) : [];

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressFormData>({
    defaultValues: {
      full_name: "",
      phone: "",
      building: "",
      colony: "",
      region: "",
      city: "",
      area: "",
      address: "",
      label: "Home",
      isDefault: false,
    },
  });

  const watchedRegion = watch("region");
  const watchedCity = watch("city");

  const { token } = useAuthStore();

  const addAddressMutation = useAddAddress(token);

  const handleAddAddress = async (addressForm: AddressFormData) => {
    if (
      !addressForm.full_name ||
      !addressForm.phone ||
      !addressForm.building ||
      !addressForm.colony ||
      !addressForm.region ||
      !addressForm.city ||
      !addressForm.area ||
      !addressForm.address
    ) {
      toast.error("Please fill in all address fields");
      return;
    }

    try {
      await addAddressMutation.mutateAsync(addressForm);
      onCancel();
      toast.success("Address added successfully!");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to add address";
      toast.error(message);
    }
  };

  const handleFormSubmit = (data: AddressFormData) => {
    handleAddAddress(data);
    reset();
  };

  // Handle region change - reset city and area
  const handleRegionChange = (value: string | null) => {
    if (!value) return;
    setSelectedRegion(value);
    setSelectedCity("");
    setValue("region", value);
    setValue("city", "");
    setValue("area", "");
  };

  // Handle city change - reset area
  const handleCityChange = (value: string | null) => {
    if (!value) return;
    setSelectedCity(value);
    setValue("city", value);
    setValue("area", "");
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid gap-4 py-4">
        {/* Full Name and Phone */}
        <div className="grid grid-cols-2 gap-4">
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
              id="address-phone"
              label="Phone"
              type="tel"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message: "Enter a valid 11-digit BD number (e.g. 01712345678)",
                },
                minLength: {
                  value: 11,
                  message: "Phone number must be 11 digits",
                },
                maxLength: {
                  value: 11,
                  message: "Phone number must be 11 digits",
                },
              })}
              startIcon={<TelephoneIcon className="size-5" />}
              placeholder="e.g. 01712345678"
              maxLength={11}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Building/House No/Floor/Street */}
        <div>
          <FloatingInput
            id="address-building"
            label="Building / House No / Floor / Street"
            {...register("building", {
              required: "Building/House No is required",
            })}
            startIcon={<Home01Icon className="size-5" />}
          />
          {errors.building && (
            <p className="text-red-500 text-sm mt-1">
              {errors.building.message as string}
            </p>
          )}
        </div>

        {/* Colony/Suburb/Locality/Landmark */}
        <div>
          <FloatingInput
            id="address-colony"
            label="Colony / Suburb / Locality / Landmark"
            {...register("colony", {
              required: "Colony/Suburb is required",
            })}
            startIcon={<Building03Icon className="size-5" />}
          />
          {errors.colony && (
            <p className="text-red-500 text-sm mt-1">
              {errors.colony.message as string}
            </p>
          )}
        </div>

        {/* Region - Dynamic */}
        <div className="flex flex-col w-full">
          <Controller
            control={control}
            name="region"
            rules={{ required: "Region is required" }}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value ?? "");
                  handleRegionChange(value);
                }}
                value={field.value}
              >
                <SelectTrigger
                  id="address-region"
                  className="h-[55px]! shadow-none w-full text-base border-input dark:bg-input/30 rounded-lg"
                >
                  <SelectValue>
                    {field.value || "Select Region"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.region && (
            <p className="text-red-500 text-sm mt-1">
              {errors.region.message as string}
            </p>
          )}
        </div>

        {/* City - Dynamic, enabled only when region selected */}
        <div className="flex flex-col w-full">
          <Controller
            control={control}
            name="city"
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  field.onChange(value ?? "");
                  handleCityChange(value);
                }}
                value={field.value}
                disabled={!watchedRegion}
              >
                <SelectTrigger
                  id="address-city"
                  className={`h-[55px]! shadow-none w-full text-base border-input dark:bg-input/30 rounded-lg ${!watchedRegion ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <SelectValue>
                    {field.value || (watchedRegion ? "Select City" : "Select Region first")}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">
              {errors.city.message as string}
            </p>
          )}
        </div>

        {/* Area - Dynamic, enabled only when city selected */}
        <div className="flex flex-col w-full">
          <Controller
            control={control}
            name="area"
            rules={{ required: "Area is required" }}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!watchedCity}
              >
                <SelectTrigger
                  id="address-area"
                  className={`h-[55px]! shadow-none w-full text-base border-input dark:bg-input/30 rounded-lg ${!watchedCity ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <SelectValue>
                    {field.value || (watchedCity ? "Select Area" : "Select City first")}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.area && (
            <p className="text-red-500 text-sm mt-1">
              {errors.area.message as string}
            </p>
          )}
        </div>

        {/* Address */}
        <div>
          <FloatingInput
            id="address-address"
            label="Address"
            {...register("address", { required: "Address is required" })}
            startIcon={<MapPinIcon className="size-5" />}
            placeholder="For Example: House# 123, Street# 123, ABC Road"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message as string}
            </p>
          )}
        </div>

        {/* Label */}
        <div className="flex flex-col w-full">
          <Controller
            control={control}
            name="label"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  id="address-label"
                  className="h-[55px]! shadow-none w-full text-base border-input dark:bg-input/30 rounded-lg"
                >
                  <SelectValue>
                    {field.value || "Select label"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {["Home", "Work", "Other"].map((label) => (
                    <SelectItem key={label} value={label}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Default checkbox */}
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