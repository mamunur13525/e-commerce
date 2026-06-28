"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, UseFormRegister, UseFormSetValue, UseFormWatch, Control, FieldErrors } from "react-hook-form";
import { ProductFormData } from "@/components/admin/products/types";

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormData>;
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
  categories: any[];
  newSize: string;
  setNewSize: (v: string) => void;
  addSize: () => void;
  removeSize: (idx: number) => void;
  colorName: string;
  setColorName: (v: string) => void;
  colorHex: string;
  setColorHex: (v: string) => void;
  addColor: () => void;
  removeColor: (idx: number) => void;
}

export function ProductFormFields({
  register,
  control,
  errors,
  watch,
  setValue,
  categories,
  newSize,
  setNewSize,
  addSize,
  removeSize,
  colorName,
  setColorName,
  colorHex,
  setColorHex,
  addColor,
  removeColor,
}: ProductFormFieldsProps) {
  return (
    <div className="grid gap-4">
      {/* 1. Name (full width) */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Name *</label>
        <Input
          placeholder="Product name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>
        )}
      </div>

      {/* 2. Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description *</label>
        <textarea
          placeholder="Product description"
          className="w-full min-h-[120px] px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message as string}</p>
        )}
      </div>

      {/* 3. Price & Final Price */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Price (৳) *</label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              validate: (v: number) => v > 0 || "Price must be greater than 0",
            })}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Final Price (৳)</label>
          <Input
            type="number"
            disabled
            className="bg-gray-50 border-gray-200 cursor-not-allowed font-medium text-gray-900"
            placeholder="Calculated automatically"
            {...register("final_price", { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* 4. Discount Checkbox & Input */}
      <div className="flex items-center gap-6 py-2 border-y border-gray-100 my-1">
        <div className="flex items-center gap-2">
          <Controller
            control={control}
            name="hasDiscount"
            render={({ field }) => (
              <Checkbox
                id="hasDiscount"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="rounded-md border-gray-300 data-[state=checked]:bg-[#003d29] data-[state=checked]:border-[#003d29]"
              />
            )}
          />
          <label htmlFor="hasDiscount" className="text-sm font-medium text-gray-700 cursor-pointer">
            Apply Discount
          </label>
        </div>

        {watch("hasDiscount") && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Discount (%)</label>
            <Input
              type="number"
              className="w-24 h-9"
              placeholder="e.g. 10"
              {...register("discount", {
                valueAsNumber: true,
                validate: (v: number) => (v >= 0 && v <= 100) || "Discount must be between 0 and 100",
              })}
            />
            {errors.discount && (
              <p className="text-red-500 text-xs mt-1">{errors.discount.message as string}</p>
            )}
          </div>
        )}
      </div>

      {/* 5. Other Fields: Category, Quantity, Weight, Sizes, Colors */}
      <div className="space-y-4 pt-2 border-t border-gray-100">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Additional Details</h4>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category *</label>
          <Controller
            control={control}
            name="category"
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full h-9 border border-gray-200">
                  <SelectValue>
                    {field.value || "Select Category"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat: any) => (
                    <SelectItem key={cat._id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category.message as string}</p>
          )}
        </div>

        {/* Quantity & Weight */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Quantity *</label>
            <Input
              type="number"
              placeholder="0"
              {...register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
                validate: (v: number) => v >= 0 || "Quantity cannot be negative",
              })}
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1">{errors.quantity.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Weight *</label>
            <Input
              placeholder="e.g. 500g, 1kg"
              {...register("weight", { required: "Weight is required" })}
            />
            {errors.weight && (
              <p className="text-red-500 text-xs mt-1">{errors.weight.message as string}</p>
            )}
          </div>
        </div>

        {/* Sizes Selection */}
        <div className="space-y-3 py-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Controller
              control={control}
              name="hasSizes"
              render={({ field }) => (
                <Checkbox
                  id="hasSizes"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="rounded-md border-gray-300 data-[state=checked]:bg-[#003d29] data-[state=checked]:border-[#003d29]"
                />
              )}
            />
            <label htmlFor="hasSizes" className="text-sm font-medium text-gray-700 cursor-pointer">
              Enable Sizes (e.g. S, M, L)
            </label>
          </div>

          {watch("hasSizes") && (
            <div className="space-y-2 animate-in fade-in duration-200 pl-6">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  placeholder="Enter size (e.g., M, 500g)"
                  className="max-w-[200px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSize();
                    }
                  }}
                />
                <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white hover:bg-gray-100 h-9 px-3" onClick={addSize}>
                  Add Size
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {(watch("sizes") || []).map((size: string, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-[#003d29] border border-green-200"
                  >
                    {size}
                    <button
                      type="button"
                      onClick={() => removeSize(idx)}
                      className="hover:text-red-500 font-bold transition-colors ml-0.5"
                    >
                      &times;
                    </button>
                  </span>
                ))}
                {(watch("sizes") || []).length === 0 && (
                  <p className="text-xs text-gray-400 italic">No sizes added yet.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Colors Selection */}
        <div className="space-y-3 py-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Controller
              control={control}
              name="hasColors"
              render={({ field }) => (
                <Checkbox
                  id="hasColors"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="rounded-md border-gray-300 data-[state=checked]:bg-[#003d29] data-[state=checked]:border-[#003d29]"
                />
              )}
            />
            <label htmlFor="hasColors" className="text-sm font-medium text-gray-700 cursor-pointer">
              Enable Colors
            </label>
          </div>

          {watch("hasColors") && (
            <div className="space-y-3 animate-in fade-in duration-200 pl-6">
              <div className="flex items-center gap-3 flex-wrap">
                <Input
                  type="text"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  placeholder="Color name (e.g. Red)"
                  className="max-w-[180px]"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colorHex}
                    onChange={(e) => setColorHex(e.target.value)}
                    className="w-10 h-9 rounded border border-gray-200 cursor-pointer bg-transparent"
                  />
                  <Input
                    type="text"
                    value={colorHex}
                    onChange={(e) => setColorHex(e.target.value)}
                    placeholder="#000000"
                    className="w-24 font-mono text-xs"
                  />
                </div>
                <button type="button" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white hover:bg-gray-100 h-9 px-3" onClick={addColor}>
                  Add Color
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {(watch("colors") || []).map((col: { name: string; code: string }, idx: number) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gray-50 text-gray-800 border border-gray-200"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-gray-300"
                      style={{ backgroundColor: col.code }}
                    />
                    <span>{col.name} ({col.code})</span>
                    <button
                      type="button"
                      onClick={() => removeColor(idx)}
                      className="hover:text-red-500 font-bold transition-colors ml-0.5"
                    >
                      &times;
                    </button>
                  </span>
                ))}
                {(watch("colors") || []).length === 0 && (
                  <p className="text-xs text-gray-400 italic">No colors added yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}