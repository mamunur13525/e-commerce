"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Combobox,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxSeparator,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Controller, UseFormRegister, UseFormSetValue, UseFormWatch, Control, FieldErrors } from "react-hook-form";
import { ProductFormData } from "@/components/admin/products/types";
import { AdminCategory, useDeleteCategory } from "@/hooks/api/admin";
import { Add01Icon, Delete01Icon } from "hugeicons-react";
import { toast } from "sonner";

interface ProductFormFieldsProps {
  register: UseFormRegister<ProductFormData>;
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
  categories: AdminCategory[];
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
  onAddCategory?: () => void;
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
  onAddCategory,
}: ProductFormFieldsProps) {
  const anchor = useComboboxAnchor();
  const deleteCategory = useDeleteCategory();

  const selectedCategory = categories.find((c) => c.name === watch("category"));

  const handleDeleteCategory = async (cat: AdminCategory) => {
    try {
      await deleteCategory.mutateAsync(cat._id);
      toast.success(`Category "${cat.name}" deleted successfully`);
      if (watch("category") === cat.name) {
        setValue("category", "");
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to delete category");
    }
  };

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
      <div className="flex flex-col gap-3 py-2 border-y border-gray-100 my-1">
        <div className="flex items-center gap-2">
          <Controller
            control={control}
            name="hasDiscount"
            render={({ field }) => (
              <Checkbox
                id="hasDiscount"
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (checked) {
                    setValue("discountType", "percentage");
                  }
                }}
                className="rounded-md border-gray-300 data-[state=checked]:bg-[#003d29] data-[state=checked]:border-[#003d29]"
              />
            )}
          />
          <label htmlFor="hasDiscount" className="text-sm font-medium text-gray-700 cursor-pointer">
            Apply Discount
          </label>
        </div>

        {watch("hasDiscount") && (
          <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-2 duration-200 pl-6">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Type</label>
              <Controller
                control={control}
                name="discountType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-28 h-9 border border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="amount">Amount (৳)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {watch("discountType") === "percentage" ? "Discount (%)" : "Discount (৳)"}
              </label>
              <Input
                type="number"
                className="w-24 h-9"
                placeholder={watch("discountType") === "percentage" ? "e.g. 10" : "e.g. 50"}
                {...register("discount", {
                  valueAsNumber: true,
                  validate: (v: number) => {
                    if (v < 0) return "Discount cannot be negative";
                    if (watch("discountType") === "percentage" && v > 100) return "Percentage must be ≤ 100";
                    return true;
                  },
                })}
              />
              {errors.discount && (
                <p className="text-red-500 text-xs mt-1">{errors.discount.message as string}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 5. Other Fields: Category, Quantity, Weight, Sizes, Colors */}
      <div className="space-y-4 pt-2 border-t border-gray-100">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Additional Details</h4>

        {/* Category - Rich Combobox with Icon, Name, Subtitle, Delete & Add */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category *</label>
          <Controller
            control={control}
            name="category"
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Combobox
                value={field.value}
                onValueChange={(value: string | null) => {
                  if (!value) return;
                  if (value === "__add_category__") {
                    onAddCategory?.();
                    return;
                  }
                  // Only update if it's a valid category name
                  const cat = categories.find((c) => c.name === value);
                  if (cat) {
                    field.onChange(value);
                  }
                }}
              >
                <div ref={anchor}>
                  {selectedCategory ? (
                    <ComboboxTrigger className="w-full flex items-center gap-3 px-3 py-2 border border-gray-200 rounded-lg bg-white min-h-10 text-left">
                      <span className="text-xl">{selectedCategory.icon}</span>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium text-gray-900">{selectedCategory.name}</p>
                        <p className="text-xs text-gray-500">{selectedCategory.subtitle}</p>
                      </div>
                    </ComboboxTrigger>
                  ) : (
                    <ComboboxInput placeholder="Search categories..." showTrigger showClear={!!field.value} />
                  )}
                </div>

                <ComboboxContent anchor={anchor.current}>
                  <ComboboxList>
                    {categories.length === 0 && (
                      <ComboboxItem value="">No categories found</ComboboxItem>
                    )}
                    <ComboboxGroup>
                      {categories.map((cat) => (
                        <ComboboxItem
                          key={cat._id}
                          value={cat.name}
                          className="flex items-center gap-3 py-2 pr-2"
                        >
                          <span className="text-xl shrink-0">{cat.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{cat.name}</p>
                            <p className="text-xs text-gray-500 truncate">{cat.subtitle}</p>
                          </div>
                          <div onClick={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
                            <AlertDialog>
                              <AlertDialogTrigger
                                render={
                                  <button
                                    type="button"
                                    className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                                  >
                                    <Delete01Icon className="size-4" />
                                  </button>
                                }
                              />
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete &ldquo;{cat.name}&rdquo;? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteCategory(cat)}
                                    className="bg-red-500 hover:bg-red-600"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </ComboboxItem>
                      ))}
                    </ComboboxGroup>
                    <ComboboxSeparator />
                    <ComboboxGroup>
                      <ComboboxItem
                        value="__add_category__"
                        className="flex items-center gap-2 py-2.5 text-[#003d29] font-medium cursor-pointer"
                      >
                        <Add01Icon className="size-4" />
                        Add Category
                      </ComboboxItem>
                    </ComboboxGroup>
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
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
                <Button type="button" variant="outline" size="sm" onClick={addSize}>
                  Add Size
                </Button>
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
                <Button type="button" variant="outline" size="sm" onClick={addColor}>
                  Add Color
                </Button>
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