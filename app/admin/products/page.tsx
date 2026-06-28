"use client";

import { useState, useEffect } from "react";
import {
  useAdminProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  AdminProduct,
  useAdminCategories,
  AdminCategory,
} from "@/hooks/api/admin";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Add01Icon, Search01Icon } from "hugeicons-react";
import { toast } from "sonner";
import { ProductFormData, defaultValues } from "@/components/admin/products/types";
import { ProductTable } from "@/components/admin/products/product-table";
import { ImageUploadSection } from "@/components/admin/products/image-upload-section";
import { ProductFormFields } from "@/components/admin/products/product-form-fields";
import { ProductDetailsDrawer } from "@/components/admin/products/product-details-drawer";

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data, isLoading } = useAdminProducts({
    page,
    limit: 20,
    search: debouncedSearch,
  });

  const { data: categoriesData } = useAdminCategories();
  const categories = (categoriesData?.data as AdminCategory[]) || [];

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues,
  });

  // Watchers for Price & Discount automatic calculation
  const price = watch("price");
  const hasDiscount = watch("hasDiscount");
  const discount = watch("discount");

  useEffect(() => {
    const p = parseFloat(price as any) || 0;
    const d = hasDiscount ? (parseFloat(discount as any) || 0) : 0;
    const final = p - (p * (d / 100));
    setValue("final_price", Number(final.toFixed(2)));
  }, [price, hasDiscount, discount, setValue]);

  // Sizes management state & functions
  const [newSize, setNewSize] = useState("");
  const sizes = watch("sizes") || [];

  const addSize = () => {
    const trimmed = newSize.trim();
    if (trimmed && !sizes.includes(trimmed)) {
      setValue("sizes", [...sizes, trimmed]);
      setNewSize("");
    }
  };

  const removeSize = (idx: number) => {
    setValue("sizes", sizes.filter((_, i) => i !== idx));
  };

  // Colors management state & functions
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#003d29");
  const colors = watch("colors") || [];

  const addColor = () => {
    const nameTrimmed = colorName.trim();
    const hexTrimmed = colorHex.trim();
    if (nameTrimmed && hexTrimmed) {
      setValue("colors", [...colors, { name: nameTrimmed, code: hexTrimmed }]);
      setColorName("");
      setColorHex("#003d29");
    }
  };

  const removeColor = (idx: number) => {
    setValue("colors", colors.filter((_, i) => i !== idx));
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    const timer = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  };

  const openCreate = () => {
    reset(defaultValues);
    setIsCreateOpen(true);
  };

  const openEdit = (product: AdminProduct) => {
    setEditingProduct(product);

    // Resolve category name
    const match = (categories as AdminCategory[]).find(
      (c) =>
        c.name.toLowerCase() === product.category?.toLowerCase() ||
        c.slug?.toLowerCase() === product.category?.toLowerCase()
    );
    const defaultCategory = match ? match.name : product.category;

    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      hasDiscount: product.discount > 0,
      discount: product.discount,
      final_price: product.final_price,
      quantity: product.quantity,
      weight: product.weight,
      category: defaultCategory || "",
      hasSizes: Array.isArray(product.sizes) && product.sizes.length > 0,
      sizes: product.sizes || [],
      hasColors: Array.isArray(product.colors) && product.colors.length > 0,
      colors: product.colors || [],
      image: product.image || { url: "" },
      images: product.images || [],
      currency: product.currency || "BDT",
    });
    setIsEditOpen(true);
  };

  const onSubmit = async (formData: ProductFormData) => {
    const payload = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      final_price: formData.final_price,
      quantity: formData.quantity,
      weight: formData.weight,
      category: formData.category,
      discount: formData.hasDiscount ? formData.discount : 0,
      currency: formData.currency,
      image: formData.image,
      images: formData.images,
      sizes: formData.hasSizes ? formData.sizes : undefined,
      colors: formData.hasColors ? formData.colors : undefined,
    };

    try {
      if (isCreateOpen) {
        await createProduct.mutateAsync(payload);
        toast.success("Product created successfully");
        setIsCreateOpen(false);
      } else if (isEditOpen && editingProduct) {
        await updateProduct.mutateAsync({ id: editingProduct._id, ...payload });
        toast.success("Product updated successfully");
        setIsEditOpen(false);
        setEditingProduct(null);
      }
      reset(defaultValues);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete product");
    }
  };

  const handleViewDetails = (product: AdminProduct) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Button onClick={openCreate}>
          <Add01Icon className="size-4" />
          Add Product
        </Button>
      </div>
      {/* Search */}
      <div className="relative max-w-sm">
        <Search01Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
        />
      </div>

      {/* Products Table */}
      <ProductTable
        data={data}
        isLoading={isLoading}
        page={page}
        onPageChange={setPage}
        onEdit={openEdit}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
      />

      {/* Product Details Drawer */}
      <ProductDetailsDrawer
        product={selectedProduct}
        open={isDrawerOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsDrawerOpen(false);
            setSelectedProduct(null);
          }
        }}
      />

      {/* Create Product Dialog */}
      <Dialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateOpen(false);
            reset(defaultValues);
          }
        }}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new product.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="py-4">
            <div className="grid grid-cols-[400px_1fr] gap-6">
              {/* Left Column - Image Upload */}
              <ImageUploadSection
                control={control}
                setValue={setValue}
                watch={watch}
              />
              {/* Right Column - Form Fields */}
              <div className="space-y-4">
                <ProductFormFields
                  register={register}
                  control={control}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  categories={categories}
                  newSize={newSize}
                  setNewSize={setNewSize}
                  addSize={addSize}
                  removeSize={removeSize}
                  colorName={colorName}
                  setColorName={setColorName}
                  colorHex={colorHex}
                  setColorHex={setColorHex}
                  addColor={addColor}
                  removeColor={removeColor}
                />
              </div>
            </div>
            <DialogFooter className="pt-4 border-t border-gray-100 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreateOpen(false);
                  reset(defaultValues);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createProduct.isPending}>
                {createProduct.isPending ? "Creating..." : "Create Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog
        open={isEditOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsEditOpen(false);
            setEditingProduct(null);
            reset(defaultValues);
          }
        }}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update the product details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="py-4">
            <div className="grid grid-cols-[400px_1fr] gap-6">
              {/* Left Column - Image Upload */}
              <ImageUploadSection
                control={control}
                setValue={setValue}
                watch={watch}
              />
              {/* Right Column - Form Fields */}
              <div className="space-y-4">
                <ProductFormFields
                  register={register}
                  control={control}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  categories={categories}
                  newSize={newSize}
                  setNewSize={setNewSize}
                  addSize={addSize}
                  removeSize={removeSize}
                  colorName={colorName}
                  setColorName={setColorName}
                  colorHex={colorHex}
                  setColorHex={setColorHex}
                  addColor={addColor}
                  removeColor={removeColor}
                />
              </div>
            </div>
            <DialogFooter className="pt-4 border-t border-gray-100 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditOpen(false);
                  setEditingProduct(null);
                  reset(defaultValues);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateProduct.isPending}>
                {updateProduct.isPending ? "Updating..." : "Update Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}