"use client";

import { useState, useEffect } from "react";
import {
  useAdminSettings,
  useUpdateSettings,
} from "@/hooks/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Discount01Icon, AlertCircleIcon, TaxesIcon } from "hugeicons-react";

export default function AdminSettingsPage() {
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState<string>("0");
  const [taxType, setTaxType] = useState<"percentage" | "fixed">("percentage");
  const [taxValue, setTaxValue] = useState<string>("0");

  const { data: settings, isLoading } = useAdminSettings();
  const updateSettings = useUpdateSettings();

  // Load current settings
  useEffect(() => {
    if (settings) {
      setDiscountType(settings.onlinePaymentDiscount.type);
      setDiscountValue(settings.onlinePaymentDiscount.value.toString());
      if (settings.tax) {
        setTaxType(settings.tax.type);
        setTaxValue(settings.tax.value.toString());
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const handleSaveDiscount = async () => {
    const value = parseFloat(discountValue);
    if (isNaN(value) || value < 0) {
      toast.error("Please enter a valid discount value");
      return;
    }
    try {
      await updateSettings.mutateAsync({
        onlinePaymentDiscount: {
          type: discountType,
          value,
        },
      });
      toast.success("Discount settings updated successfully");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to update settings");
    }
  };

  const handleSaveTax = async () => {
    const value = parseFloat(taxValue);
    if (isNaN(value) || value < 0) {
      toast.error("Please enter a valid tax value");
      return;
    }
    try {
      await updateSettings.mutateAsync({
        tax: {
          type: taxType,
          value,
        },
      });
      toast.success("Tax settings updated successfully");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to update settings");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage global application settings
        </p>
      </div>
<section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 space-y-6 gap-6">

      {/* Online Payment Discount */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Discount01Icon className="size-5 text-emerald-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Online Payment Discount
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 mt-0.5">
                Offer a discount to customers who pay via online payment methods
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Info box */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertCircleIcon className="size-5 text-blue-500 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-semibold mb-1">How it works</p>
              <p>
                When a customer selects online payment at checkout, this discount will be
                automatically applied to their order total. Set to 0 to disable the discount.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            {/* Discount Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Discount Type
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed")}
                className="w-full h-9 px-2.5 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29] bg-white"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (৳)</option>
              </select>
            </div>

            {/* Discount Value */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {discountType === "percentage" ? "Discount Percentage" : "Discount Amount"}
              </label>
              <Input
                type="number"
                min="0"
                step={discountType === "percentage" ? "1" : "0.01"}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder={discountType === "percentage" ? "e.g. 5" : "e.g. 50"}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
            <p className="text-sm text-gray-600">
              {parseFloat(discountValue) > 0 ? (
                <>
                  Customers paying online will get{" "}
                  <span className="font-bold text-emerald-600">
                    {discountType === "percentage"
                      ? `${discountValue}% off`
                      : `৳${parseFloat(discountValue).toFixed(2)} off`}
                  </span>{" "}
                  on their order.
                </>
              ) : (
                <span className="text-gray-400">No discount is currently active.</span>
              )}
            </p>
          </div>

          <Button
            onClick={handleSaveDiscount}
            disabled={updateSettings.isPending}
            className="w-full sm:w-auto"
          >
            {updateSettings.isPending ? "Saving..." : "Save Discount Settings"}
          </Button>
        </CardContent>
      </Card>

      {/* Tax Settings */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <TaxesIcon className="size-5 text-amber-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Tax Settings
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 mt-0.5">
                Configure tax applied to all orders at checkout
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Info box */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertCircleIcon className="size-5 text-blue-500 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-semibold mb-1">How it works</p>
              <p>
                Tax will be automatically calculated and added to every order at checkout.
                Set to 0 to disable tax. For percentage-based tax, the amount is calculated
                as a percentage of the subtotal (after promo discount).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            {/* Tax Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Tax Type
              </label>
              <select
                value={taxType}
                onChange={(e) => setTaxType(e.target.value as "percentage" | "fixed")}
                className="w-full h-9 px-2.5 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29] bg-white"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (৳)</option>
              </select>
            </div>

            {/* Tax Value */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {taxType === "percentage" ? "Tax Percentage" : "Tax Amount"}
              </label>
              <Input
                type="number"
                min="0"
                step={taxType === "percentage" ? "1" : "0.01"}
                value={taxValue}
                onChange={(e) => setTaxValue(e.target.value)}
                placeholder={taxType === "percentage" ? "e.g. 10" : "e.g. 50"}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
            <p className="text-sm text-gray-600">
              {parseFloat(taxValue) > 0 ? (
                <>
                  A{" "}
                  <span className="font-bold text-amber-600">
                    {taxType === "percentage"
                      ? `${taxValue}% tax`
                      : `৳${parseFloat(taxValue).toFixed(2)} tax`}
                  </span>{" "}
                  will be applied to every order.
                </>
              ) : (
                <span className="text-gray-400">No tax is currently applied.</span>
              )}
            </p>
          </div>

          <Button
            onClick={handleSaveTax}
            disabled={updateSettings.isPending}
            className="w-full sm:w-auto"
          >
            {updateSettings.isPending ? "Saving..." : "Save Tax Settings"}
          </Button>
        </CardContent>
      </Card>
</section>

    </div>
  );
}