"use client";

import { useState, useEffect, useRef } from "react";
import {
  useAdminDeliveryZones,
  useCreateDeliveryZone,
  useUpdateDeliveryZone,
  useDeleteDeliveryZone,
  AdminDeliveryZone,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Add01Icon, Edit01Icon, Delete01Icon, Search01Icon, MapPinIcon } from "hugeicons-react";
import { toast } from "sonner";

interface ZoneForm {
  name: string;
  fee: string;
  estimatedDelivery: string;
  isActive: boolean;
}

const defaultZoneForm: ZoneForm = {
  name: "",
  fee: "",
  estimatedDelivery: "",
  isActive: true,
};

export default function AdminDeliveryZonesPage() {
  const [page] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<AdminDeliveryZone | null>(null);
  const [form, setForm] = useState<ZoneForm>(defaultZoneForm);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, isLoading } = useAdminDeliveryZones({
    page,
    limit: 50,
    search: debouncedSearch,
  });

  const createZone = useCreateDeliveryZone();
  const updateZone = useUpdateDeliveryZone();
  const deleteZone = useDeleteDeliveryZone();

  const handleSearch = (value: string) => {
    setSearch(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setDebouncedSearch(value);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

  const resetForm = () => {
    setForm(defaultZoneForm);
  };

  const updateField = <K extends keyof ZoneForm>(key: K, value: ZoneForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const openCreate = () => {
    resetForm();
    setIsCreateOpen(true);
  };

  const openEdit = (zone: AdminDeliveryZone) => {
    setEditingZone(zone);
    setForm({
      name: zone.name,
      fee: zone.fee.toString(),
      estimatedDelivery: zone.estimatedDelivery,
      isActive: zone.isActive,
    });
    setIsEditOpen(true);
  };

  const handleCreate = async () => {
    if (!form.name.trim() || !form.fee || !form.estimatedDelivery.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await createZone.mutateAsync({
        name: form.name,
        fee: Number(form.fee),
        estimatedDelivery: form.estimatedDelivery,
        isActive: form.isActive,
      });
      toast.success("Delivery zone created successfully");
      setIsCreateOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create delivery zone");
    }
  };

  const handleUpdate = async () => {
    if (!editingZone) return;
    if (!form.name.trim() || !form.fee || !form.estimatedDelivery.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await updateZone.mutateAsync({
        id: editingZone._id,
        name: form.name,
        fee: Number(form.fee),
        estimatedDelivery: form.estimatedDelivery,
        isActive: form.isActive,
      });
      toast.success("Delivery zone updated successfully");
      setIsEditOpen(false);
      setEditingZone(null);
      resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update delivery zone");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteZone.mutateAsync(id);
      toast.success("Delivery zone deleted successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete delivery zone");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delivery Zones</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage delivery zones and their fees
          </p>
        </div>
        <Button onClick={openCreate} size="sm">
          <Add01Icon className="size-4" />
          Add Zone
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search01Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search zones..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
          />
        </div>
      </div>

      {/* Zones Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : !data || data.data.length === 0 ? (
          <div className="p-12 text-center">
            <MapPinIcon className="size-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No delivery zones found.</p>
            <p className="text-gray-400 text-sm mt-1">
              Create your first delivery zone to get started.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone Name</TableHead>
                <TableHead>Delivery Fee</TableHead>
                <TableHead>Est. Delivery</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((zone) => (
                <TableRow key={zone._id}>
                  <TableCell>
                    <span className="font-semibold text-gray-900">
                      {zone.name}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    ৳{zone.fee.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {zone.estimatedDelivery}
                  </TableCell>
                  <TableCell>
                    {zone.isActive ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        Inactive
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(zone.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => openEdit(zone)}
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
                            <AlertDialogTitle>Delete Zone</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete delivery zone{" "}
                              <span className="font-bold text-black">
                                "{zone.name}"
                              </span>
                              ? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(zone._id)}
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

      {/* Create/Edit Zone Dialog */}
      <Dialog
        open={isCreateOpen || isEditOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateOpen(false);
            setIsEditOpen(false);
            setEditingZone(null);
            resetForm();
          }
        }}
      >
        <DialogContent className="max-w-md w-[calc(100%-2rem)] sm:w-full">
          <DialogHeader>
            <DialogTitle>{isCreateOpen ? "Add Delivery Zone" : "Edit Delivery Zone"}</DialogTitle>
            <DialogDescription>
              {isCreateOpen
                ? "Create a new delivery zone with a fee."
                : "Update the delivery zone details."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            {/* Zone Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Zone Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="e.g. Dhaka City, Inside Dhaka"
              />
            </div>

            {/* Fee & Estimated Delivery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Delivery Fee (৳) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.fee}
                  onChange={(e) => updateField("fee", e.target.value)}
                  placeholder="e.g. 60"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Est. Delivery <span className="text-red-500">*</span>
                </label>
                <Input
                  value={form.estimatedDelivery}
                  onChange={(e) => updateField("estimatedDelivery", e.target.value)}
                  placeholder="e.g. 2-3 business days"
                />
              </div>
            </div>

            {/* Active toggle */}
            <label className="flex items-center gap-3 cursor-pointer pt-2 border-t border-gray-100">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => updateField("isActive", e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#003d29] focus:ring-[#003d29]"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setIsCreateOpen(false);
                setIsEditOpen(false);
                setEditingZone(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button onClick={isCreateOpen ? handleCreate : handleUpdate} className="w-full sm:w-auto">
              {isCreateOpen ? "Create Zone" : "Update Zone"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}