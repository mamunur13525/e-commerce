"use client";

import { useState } from "react";
import {
  useAdminCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  AdminCategory,
} from "@/hooks/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { useForm } from "react-hook-form";
import { Add01Icon, Edit01Icon, Delete01Icon, Search01Icon } from "hugeicons-react";
import { toast } from "sonner";

interface CategoryFormData {
  type: string;
  name: string;
  subtitle: string;
  color: string;
  icon: string;
  slug: string;
  count: number;
}

const defaultValues: CategoryFormData = {
  type: "",
  name: "",
  subtitle: "",
  color: "#d4e157",
  icon: "🌿",
  slug: "",
  count: 0,
};

export default function AdminCategoriesPage() {
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);

  const { data, isLoading } = useAdminCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues,
  });

  const openCreate = () => {
    reset(defaultValues);
    setIsCreateOpen(true);
  };

  const openEdit = (category: AdminCategory) => {
    setEditingCategory(category);
    reset({
      type: category.type,
      name: category.name,
      subtitle: category.subtitle,
      color: category.color,
      icon: category.icon,
      slug: category.slug || "",
      count: category.count,
    });
    setIsEditOpen(true);
  };

  const handleCreate = async (formData: CategoryFormData) => {
    try {
      await createCategory.mutateAsync({
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      });
      toast.success("Category created successfully");
      setIsCreateOpen(false);
      reset(defaultValues);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create category");
    }
  };

  const handleEdit = async (formData: CategoryFormData) => {
    if (!editingCategory) return;
    try {
      await updateCategory.mutateAsync({
        id: editingCategory._id,
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      });
      toast.success("Category updated successfully");
      setIsEditOpen(false);
      setEditingCategory(null);
      reset(defaultValues);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update category");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteCategory.mutateAsync(id);
      toast.success(`Category "${name}" deleted successfully`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete category");
    }
  };

  const filteredCategories = data?.data?.filter((cat) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.type.toLowerCase().includes(q) ||
      cat.subtitle.toLowerCase().includes(q)
    );
  }) || [];

  const closeDialogs = () => {
    setIsCreateOpen(false);
    setIsEditOpen(false);
    setEditingCategory(null);
    reset(defaultValues);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <Button onClick={openCreate}>
          <Add01Icon className="size-4" />
          Add Category
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search01Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search categories by name, type or subtitle..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
        />
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No categories found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Icon</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Subtitle</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Color</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Slug</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Products</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr
                    key={category._id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-xl">
                      {category.icon}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">
                        {category.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{category.type}</td>
                    <td className="py-3 px-4 text-gray-500 max-w-[180px] truncate">
                      {category.subtitle}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full border border-gray-200"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-xs text-gray-500 font-mono">
                          {category.color}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs font-mono">
                      {category.slug || "-"}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">
                        {category.count}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(category)}
                        >
                          <Edit01Icon className="size-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={
                              <Button variant="ghost" size="icon-sm">
                                <Delete01Icon className="size-4 text-red-500" />
                              </Button>
                            }
                          />
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Category</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete{" "}
                                <span className="font-bold text-black">
                                  &quot;{category.name}&quot;
                                </span>
                                ? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(category._id, category.name)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        )}
      </div>

      {/* Create/Edit Category Dialog */}
      <Dialog
        open={isCreateOpen || isEditOpen}
        onOpenChange={(open) => {
          if (!open) closeDialogs();
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{isCreateOpen ? "Add Category" : "Edit Category"}</DialogTitle>
            <DialogDescription>
              {isCreateOpen
                ? "Create a new product category."
                : "Update the category details."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(isCreateOpen ? handleCreate : handleEdit)}>
            <div className="space-y-4">
              {/* Name & Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Indoor Plants"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="e.g. plants"
                    {...register("type", { required: "Type is required" })}
                  />
                  {errors.type && (
                    <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
                  )}
                </div>
              </div>

              {/* Subtitle */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Subtitle <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. Bring nature inside"
                  {...register("subtitle", { required: "Subtitle is required" })}
                />
                {errors.subtitle && (
                  <p className="text-red-500 text-xs mt-1">{errors.subtitle.message}</p>
                )}
              </div>

              {/* Color & Icon */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Color <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      {...register("color", { required: "Color is required" })}
                      className="w-10 h-9 rounded border border-gray-200 cursor-pointer bg-transparent"
                    />
                    <Input
                      placeholder="#d4e157"
                      {...register("color", { required: "Color is required" })}
                    />
                    {errors.color && (
                      <p className="text-red-500 text-xs mt-1">{errors.color.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Icon <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g. 🌿 or 🪴"
                      {...register("icon", { required: "Icon is required" })}
                    />
                    {errors.icon && (
                      <p className="text-red-500 text-xs mt-1">{errors.icon.message}</p>
                    )}
                  </div>
                </div>

                {/* Slug & Count */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Slug</label>
                    <Input
                      placeholder="Auto-generated if empty"
                      {...register("slug")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Product Count</label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      {...register("count", { valueAsNumber: true })}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={closeDialogs}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isCreateOpen ? "Create Category" : "Update Category"}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
