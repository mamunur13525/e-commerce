"use client";

import { useState, useEffect, useMemo } from "react";
import {
  useAdminMetadata,
  useUpdateMetadata,
} from "@/hooks/api/admin";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { SaveEnergy01Icon, Add01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import {
  HeroSlideEditor,
  OfferEditor,
  DiscountCardEditor,
} from "@/components/admin/metadata/index";
import { SwapySection } from "@/components/admin/metadata/swapy-section";

// ==================== Types ====================

interface MetadataFormData {
  hero_slider: Array<{
    image_url: string;
    link?: string;
  }>;
  offers: Array<{
    _id: string;
    sub_title: string;
    title: string;
    description: string;
    product_image: string;
    primary_color: string;
    secondary_color: string;
  }>;
  discout_cards: Array<{
    _id: string;
    type: string;
    icon: string;
    title: string;
    description: string;
    bg_color: string;
    cta_btn: { color: string; text: string; bg_color: string; link: string };
  }>;
}

const emptyMetadata: MetadataFormData = {
  hero_slider: [],
  offers: [],
  discout_cards: [],
};

const TAB_KEYS = ["hero", "offers", "discounts"] as const;
type TabKey = (typeof TAB_KEYS)[number];

const TABS: { id: TabKey; label: string }[] = [
  { id: "hero", label: "Hero Slider" },
  { id: "offers", label: "Offers" },
  { id: "discounts", label: "Discount Cards" },
];

// ==================== Main Page ====================

export default function AdminMetadataPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("hero");

  const { data, isLoading } = useAdminMetadata();
  const updateMetadata = useUpdateMetadata();

  const form = useForm<MetadataFormData>({
    defaultValues: emptyMetadata,
  });

  // Update form when data loads
  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  // Field arrays for each tab
  const {
    fields: heroFields,
    append: appendHero,
    remove: removeHero,
    move: moveHero,
  } = useFieldArray({ control: form.control, name: "hero_slider" });

  const {
    fields: offerFields,
    append: appendOffer,
    remove: removeOffer,
    move: moveOffer,
  } = useFieldArray({ control: form.control, name: "offers" });

  const {
    fields: discountFields,
    append: appendDiscount,
    remove: removeDiscount,
    move: moveDiscount,
  } = useFieldArray({ control: form.control, name: "discout_cards" });

  const onSubmit = async (formData: MetadataFormData) => {
    try {
      await updateMetadata.mutateAsync(formData);
      toast.success("Metadata updated successfully");
    } catch (error) {
      const err = error as Error;
      toast.error(err?.message || "Failed to update metadata");
    }
  };

  const tabCounts = useMemo(
    () => ({
      hero: heroFields.length,
      offers: offerFields.length,
      discounts: discountFields.length,
    }),
    [heroFields.length, offerFields.length, discountFields.length]
  );

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homepage Editor</h1>
          <p className="text-sm text-gray-500 mt-1">
            Design your homepage sections — drag to reorder, or click to edit
          </p>
        </div>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isLoading || updateMetadata.isPending}
          className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
        >
          <SaveEnergy01Icon className="size-4" />
          {updateMetadata.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-72 w-full rounded-2xl" />
          <Skeleton className="h-72 w-full rounded-2xl" />
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Pill Tabs */}
          <div className="flex gap-2 bg-gray-100/80 p-1 rounded-xl w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-white text-emerald-800 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "ml-1.5 text-xs px-1.5 py-0.5 rounded-full",
                    activeTab === tab.id
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-200 text-gray-500"
                  )}
                >
                  {tabCounts[tab.id]}
                </span>
              </button>
            ))}
          </div>

          {/* Hero Slider Tab */}
          {activeTab === "hero" && (
            <div className="space-y-4">
              {heroFields.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm mb-4">
                    No hero slides yet. Add your first slide to get started.
                  </p>
                </div>
              )}

              {heroFields.length > 0 && (
                <SwapySection
                  fields={heroFields}
                  onReorder={(from, to) => moveHero(from, to)}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  renderItem={(item, index) => (
                    <HeroSlideEditor
                      key={item.id}
                      index={index}
                      total={heroFields.length}
                      form={form}
                      onRemove={() => removeHero(index)}
                    />
                  )}
                />
              )}

              <button
                type="button"
                onClick={() =>
                  appendHero({
                    image_url: "",
                    link: "/shop",
                  })
                }
                className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-emerald-600/40 hover:text-emerald-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Add01Icon className="size-4" />
                Add Hero Slide
              </button>
            </div>
          )}

          {/* Offers Tab */}
          {activeTab === "offers" && (
            <div className="space-y-4">
              {offerFields.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm mb-4">
                    No offers yet. Create your first promotional offer.
                  </p>
                </div>
              )}

              {offerFields.length > 0 && (
                <SwapySection
                  fields={offerFields}
                  onReorder={(from, to) => moveOffer(from, to)}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  renderItem={(item, index) => (
                    <OfferEditor
                      key={item.id}
                      index={index}
                      total={offerFields.length}
                      form={form}
                      onRemove={() => removeOffer(index)}
                    />
                  )}
                />
              )}

              <button
                type="button"
                onClick={() =>
                  appendOffer({
                    _id: `offer-${Date.now()}`,
                    sub_title: "",
                    title: "",
                    description: "",
                    product_image: "",
                    primary_color: "#d4e157",
                    secondary_color: "#003d29",
                  })
                }
                className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-emerald-600/40 hover:text-emerald-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Add01Icon className="size-4" />
                Add Offer
              </button>
            </div>
          )}

          {/* Discount Cards Tab */}
          {activeTab === "discounts" && (
            <div className="space-y-4">
              {discountFields.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm mb-4">
                    No discount cards yet. Add your first discount offer.
                  </p>
                </div>
              )}

              {discountFields.length > 0 && (
                <SwapySection
                  fields={discountFields}
                  onReorder={(from, to) => moveDiscount(from, to)}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  renderItem={(item, index) => (
                    <DiscountCardEditor
                      key={item.id}
                      index={index}
                      total={discountFields.length}
                      form={form}
                      onRemove={() => removeDiscount(index)}
                    />
                  )}
                />
              )}

              <button
                type="button"
                onClick={() =>
                  appendDiscount({
                    _id: `discount-${Date.now()}`,
                    type: "percentage",
                    icon: "🏷️",
                    title: "",
                    description: "",
                    bg_color: "#f5f5f5",
                    cta_btn: {
                      color: "#003d29",
                      text: "Shop Now",
                      bg_color: "#ffffff",
                      link: "/shop",
                    },
                  })
                }
                className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-emerald-600/40 hover:text-emerald-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Add01Icon className="size-4" />
                Add Discount Card
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
