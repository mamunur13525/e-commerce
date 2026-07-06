"use client";

import { useState } from "react";
import {
  useAdminCategories,
  useUpdateCategory,
  useDeleteCategory,
  AdminCategory,
} from "@/hooks/api/admin";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Add01Icon, Edit01Icon, Delete01Icon, Search01Icon } from "hugeicons-react";
import { toast } from "sonner";
import AddCategoryItem from "@/components/admin/categories/add-category-item";
import EditCategoryItem from "@/components/admin/categories/edit-category-item";

interface CategoryFormData {
  type: string;
  name: string;
  subtitle: string;
  color: string;
  icon: string;
}

const defaultValues: CategoryFormData = {
  type: "",
  name: "",
  subtitle: "",
  color: "#d4e157",
  icon: "🌿",
};

export default function AdminCategoriesPage() {
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);

  const { data, isLoading } = useAdminCategories();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
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
    });
    setIsEditOpen(true);
  };

  const handleEdit = async (formData: CategoryFormData) => {
    if (!editingCategory) return;
    try {
      await updateCategory.mutateAsync({
        id: editingCategory._id,
        ...formData,
        slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
        count: editingCategory.count,
      });
      toast.success("Category updated successfully");
      closeDialogs();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to update category");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    try {
      await deleteCategory.mutateAsync(id);
      toast.success(`Category "${name}" deleted successfully`);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to delete category");
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
      <div className="relative w-full sm:max-w-sm">
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subtitle</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Products</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell className="text-xl">{category.icon}</TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900">
                      {category.name}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600">{category.type}</TableCell>
                  <TableCell className="text-gray-500 max-w-[180px] truncate">
                    {category.subtitle}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full border border-gray-200 shrink-0"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-xs text-gray-500 font-mono">
                        {category.color}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500 text-xs font-mono">
                    {category.slug || "-"}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900">
                      {category.count}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
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
                                &ldquo;{category.name}&rdquo;
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Add Category Dialog */}
      <AddCategoryItem
        open={isCreateOpen}
        onClose={closeDialogs}
      />

      {/* Edit Category Dialog */}
      <EditCategoryItem
        open={isEditOpen}
        onClose={closeDialogs}
        category={editingCategory}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={handleEdit}
        isPending={updateCategory.isPending}
        watch={watch}
        setValue={setValue}
      />
    </div>
  );
}