"use client";

import { useState, useRef, useEffect } from "react";
import {
  useAdminPromos,
  useCreatePromo,
  useUpdatePromo,
  useDeletePromo,
  AdminPromo,
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

interface PromoForm {
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  maxDiscount: string;
  minOrderAmount: number;
  maxUsageCount: string;
  expiryDate: string;
  isActive: boolean;
  applicableToFirstOrder: boolean;
}

const defaultPromoForm: PromoForm = {
  code: "",
  description: "",
  discountType: "percentage",
  discountValue: 0,
  maxDiscount: "",
  minOrderAmount: 0,
  maxUsageCount: "",
  expiryDate: "",
  isActive: true,
  applicableToFirstOrder: false,
};

export default function AdminPromosPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<AdminPromo | null>(null);
  const [form, setForm] = useState<PromoForm>(defaultPromoForm);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, isLoading } = useAdminPromos({
    page,
    limit: 20,
    search: debouncedSearch,
    isActive: statusFilter,
  });

  const createPromo = useCreatePromo();
  const updatePromo = useUpdatePromo();
  const deletePromo = useDeletePromo();

  const handleSearch = (value: string) => {
    setSearch(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

  const resetForm = () => {
    setForm(defaultPromoForm);
  };

  const updateField = <K extends keyof PromoForm>(key: K, value: PromoForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const openCreate = () => {
    resetForm();
    setIsCreateOpen(true);
  };

  const openEdit = (promo: AdminPromo) => {
    setEditingPromo(promo);
    setForm({
      code: promo.code,
      description: promo.description || "",
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      maxDiscount: promo.maxDiscount?.toString() || "",
      minOrderAmount: promo.minOrderAmount,
      maxUsageCount: promo.maxUsageCount?.toString() || "",
      expiryDate: promo.expiryDate
        ? new Date(promo.expiryDate).toISOString().split("T")[0]
        : "",
      isActive: promo.isActive,
      applicableToFirstOrder: promo.applicableToFirstOrder,
    });
    setIsEditOpen(true);
  };

  const handleCreate = async () => {
    if (!form.code.trim() || !form.discountValue || !form.expiryDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await createPromo.mutateAsync({
        code: form.code,
        description: form.description,
        discountType: form.discountType,
        discountValue: form.discountValue,
        maxDiscount: form.maxDiscount !== "" ? Number(form.maxDiscount) : null,
        minOrderAmount: form.minOrderAmount,
        maxUsageCount: form.maxUsageCount !== "" ? Number(form.maxUsageCount) : null,
        expiryDate: form.expiryDate,
        isActive: form.isActive,
        applicableToFirstOrder: form.applicableToFirstOrder,
      });
      toast.success("Promo created successfully");
      setIsCreateOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create promo");
    }
  };

  const handleUpdate = async () => {
    if (!editingPromo) return;
    if (!form.code.trim() || !form.discountValue || !form.expiryDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await updatePromo.mutateAsync({
        id: editingPromo._id,
        code: form.code,
        description: form.description,
        discountType: form.discountType,
        discountValue: form.discountValue,
        maxDiscount: form.maxDiscount !== "" ? Number(form.maxDiscount) : null,
        minOrderAmount: form.minOrderAmount,
        maxUsageCount: form.maxUsageCount !== "" ? Number(form.maxUsageCount) : null,
        expiryDate: form.expiryDate,
        isActive: form.isActive,
        applicableToFirstOrder: form.applicableToFirstOrder,
      });
      toast.success("Promo updated successfully");
      setIsEditOpen(false);
      setEditingPromo(null);
      resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update promo");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePromo.mutateAsync(id);
      toast.success("Promo deleted successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete promo");
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpired = (dateStr: string) => {
    return new Date(dateStr) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Promos &amp; Coupons</h1>
        <Button onClick={openCreate}>
          <Add01Icon className="size-4" />
          Add Promo
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search01Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search promos by code or description..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29] bg-white"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Promos Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : !data || data.data.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No promos found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Code</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Usage</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Expiry</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((promo) => (
                  <tr
                    key={promo._id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-900 uppercase tracking-wide">
                        {promo.code}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 max-w-[200px] truncate">
                      {promo.description || "-"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          promo.discountType === "percentage"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {promo.discountType === "percentage" ? "% Off" : "Fixed"}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {promo.discountType === "percentage"
                        ? `${promo.discountValue}%`
                        : `\u09F3${promo.discountValue.toFixed(2)}`}
                      {promo.discountType === "percentage" && promo.maxDiscount && (
                        <span className="text-gray-400 text-xs ml-1">
                          (max \u09F3{promo.maxDiscount})
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600">
                        {promo.usageCount}
                        {promo.maxUsageCount ? ` / ${promo.maxUsageCount}` : ""}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {isExpired(promo.expiryDate) ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          Expired
                        </span>
                      ) : promo.isActive ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`${
                          isExpired(promo.expiryDate)
                            ? "text-red-500"
                            : "text-gray-600"
                        }`}
                      >
                        {formatDate(promo.expiryDate)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(promo)}
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
                              <AlertDialogTitle>Delete Promo</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete promo code{" "}
                                <span className="font-bold text-black uppercase">
                                  &quot;{promo.code}&quot;
                                </span>
                                ? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(promo._id)}
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

      {/* Create/Edit Promo Dialog */}
      <Dialog
        open={isCreateOpen || isEditOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateOpen(false);
            setIsEditOpen(false);
            setEditingPromo(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{isCreateOpen ? "Add Promo" : "Edit Promo"}</DialogTitle>
            <DialogDescription>
              {isCreateOpen
                ? "Create a new promo code for your customers."
                : "Update the promo code details."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            {/* Code & Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Code <span className="text-red-500">*</span>
                </label>
                <Input
                  value={form.code}
                  onChange={(e) => updateField("code", e.target.value.toUpperCase())}
                  placeholder="e.g. SUMMER25"
                  className="uppercase"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Discount Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.discountType}
                  onChange={(e) =>
                    updateField("discountType", e.target.value as "percentage" | "fixed")
                  }
                  className="w-full h-9 px-2.5 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29] bg-white"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (৳)</option>
                </select>
              </div>
            </div>

            {/* Discount Value & Max Discount */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {form.discountType === "percentage"
                    ? "Discount Percentage"
                    : "Discount Amount"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  min="0"
                  value={form.discountValue || ""}
                  onChange={(e) =>
                    updateField("discountValue", parseFloat(e.target.value) || 0)
                  }
                  placeholder={form.discountType === "percentage" ? "e.g. 25" : "e.g. 500"}
                />
              </div>
              {form.discountType === "percentage" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Max Discount (৳)</label>
                  <Input
                    type="number"
                    min="0"
                    value={form.maxDiscount}
                    onChange={(e) => updateField("maxDiscount", e.target.value)}
                    placeholder="Leave empty for no limit"
                  />
                </div>
              )}
            </div>

            {/* Min Order Amount & Max Usage */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Min Order Amount (৳)</label>
                <Input
                  type="number"
                  min="0"
                  value={form.minOrderAmount || ""}
                  onChange={(e) =>
                    updateField("minOrderAmount", parseFloat(e.target.value) || 0)
                  }
                  placeholder="0 = No minimum"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Max Usage Count</label>
                <Input
                  type="number"
                  min="1"
                  value={form.maxUsageCount}
                  onChange={(e) => updateField("maxUsageCount", e.target.value)}
                  placeholder="Leave empty for unlimited"
                />
              </div>
            </div>

            {/* Expiry Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <Input
                type="date"
                value={form.expiryDate}
                onChange={(e) => updateField("expiryDate", e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Optional description for the promo"
                className="w-full min-h-[60px] px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
              />
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => updateField("isActive", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#003d29] focus:ring-[#003d29]"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.applicableToFirstOrder}
                  onChange={(e) =>
                    updateField("applicableToFirstOrder", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-gray-300 text-[#003d29] focus:ring-[#003d29]"
                />
                <span className="text-sm font-medium text-gray-700">
                  Applicable to first order only
                </span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateOpen(false);
                setIsEditOpen(false);
                setEditingPromo(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={isCreateOpen ? handleCreate : handleUpdate}>
              {isCreateOpen ? "Create Promo" : "Update Promo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
