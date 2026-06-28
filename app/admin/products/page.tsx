"use client";

import { useState } from "react";
import {
  useAdminProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  AdminProduct,
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
import { Add01Icon, Edit01Icon, Delete01Icon, Search01Icon } from "hugeicons-react";
import { toast } from "sonner";

const defaultProductForm: {
  name: string;
  description: string;
  price: number;
  final_price: number;
  quantity: number;
  weight: string;
  rating: number;
  category: string;
  discount: number;
  currency: string;
  image: { url: string };
  images: any[];
} = {
  name: "",
  description: "",
  price: 0,
  final_price: 0,
  quantity: 0,
  weight: "",
  rating: 0,
  category: "",
  discount: 0,
  currency: "USD",
  image: { url: "" },
  images: [],
};

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [form, setForm] = useState(defaultProductForm);

  const { data, isLoading } = useAdminProducts({
    page,
    limit: 20,
    search: debouncedSearch,
  });

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const handleSearch = (value: string) => {
    setSearch(value);
    const timer = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  };

  const resetForm = () => {
    setForm(defaultProductForm);
  };

  const openCreate = () => {
    resetForm();
    setIsCreateOpen(true);
  };

  const openEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      final_price: product.final_price,
      quantity: product.quantity,
      weight: product.weight,
      rating: product.rating,
      category: product.category,
      discount: product.discount,
      currency: product.currency,
      image: product.image || { url: "" },
      images: product.images || [],
    });
    setIsEditOpen(true);
  };

  const handleCreate = async () => {
    try {
      await createProduct.mutateAsync(form);
      toast.success("Product created successfully");
      setIsCreateOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create product");
    }
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;
    try {
      await updateProduct.mutateAsync({ id: editingProduct._id, ...form });
      toast.success("Product updated successfully");
      setIsEditOpen(false);
      setEditingProduct(null);
      resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update product");
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
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : !data || data.data.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Discount</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {product.image?.url && (
                          <img
                            src={product.image.url}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <span className="font-medium text-gray-900">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{product.category}</td>
                    <td className="py-3 px-4">
                      <span className="font-medium">${product.final_price?.toFixed(2)}</span>
                      {product.price > product.final_price && (
                        <span className="text-gray-400 line-through ml-2 text-xs">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-medium ${
                          product.quantity <= 5 ? "text-red-500" : "text-gray-900"
                        }`}
                      >
                        {product.quantity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {product.discount > 0 ? (
                        <span className="text-green-600 font-medium">
                          {product.discount}%
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(product)}
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
                              <AlertDialogTitle>Delete Product</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete 
                                
                                <span className='font-bold text-black'>&quot;{product.name}&quot;</span>
                                ? This action
                                cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(product._id)}
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

        {/* Pagination */}
        {data && data.pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Page {data.pagination.page} of {data.pagination.pages} ({data.pagination.total} total)
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!data.pagination.hasMore}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Create Product Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>Fill in the details to create a new product.</DialogDescription>
          </DialogHeader>
          <ProductForm form={form} setForm={setForm} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={createProduct.isPending}>
              {createProduct.isPending ? "Creating..." : "Create Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the product details.</DialogDescription>
          </DialogHeader>
          <ProductForm form={form} setForm={setForm} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={updateProduct.isPending}>
              {updateProduct.isPending ? "Updating..." : "Update Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductForm({
  form,
  setForm,
}: {
  form: typeof defaultProductForm;
  setForm: (form: any) => void;
}) {
  const updateField = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Name *</label>
          <Input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Product name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category *</label>
          <Input
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            placeholder="e.g. Electronics"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description *</label>
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Product description"
          className="w-full min-h-[80px] px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Price *</label>
          <Input
            type="number"
            value={form.price || ""}
            onChange={(e) => {
              const val = parseFloat(e.target.value) || 0;
              updateField("price", val);
              if (!form.final_price) updateField("final_price", val);
            }}
            placeholder="0.00"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Final Price</label>
          <Input
            type="number"
            value={form.final_price || ""}
            onChange={(e) => updateField("final_price", parseFloat(e.target.value) || 0)}
            placeholder="0.00"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Quantity *</label>
          <Input
            type="number"
            value={form.quantity || ""}
            onChange={(e) => updateField("quantity", parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Discount (%)</label>
          <Input
            type="number"
            value={form.discount || ""}
            onChange={(e) => updateField("discount", parseFloat(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Weight</label>
          <Input
            value={form.weight}
            onChange={(e) => updateField("weight", e.target.value)}
            placeholder="e.g. 500g"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Rating</label>
          <Input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating || ""}
            onChange={(e) => updateField("rating", parseFloat(e.target.value) || 0)}
            placeholder="0"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Image URL</label>
        <Input
          value={form.image?.url || ""}
          onChange={(e) => updateField("image", { url: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>
    </div>
  );
}