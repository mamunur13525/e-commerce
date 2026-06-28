"use client";

import { useState, useEffect } from "react";
import { useAdminMetadata, useUpdateMetadata, AdminMetadata } from "@/hooks/api/admin";
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
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { SaveEnergy01Icon } from "hugeicons-react";

interface MetadataFormData {
  hero_slider: Array<{
    bg_color: string;
    title: string;
    description: string;
    cta_btn: { color: string; text: string; bg_color: string; link: string };
    image_url: string;
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

export default function AdminMetadataPage() {
  const [activeTab, setActiveTab] = useState<"hero" | "offers" | "discounts">("hero");

  const { data, isLoading } = useAdminMetadata();
  const updateMetadata = useUpdateMetadata();

  const form = useForm<MetadataFormData>({
    defaultValues: emptyMetadata,
  });

  const watchedHeroImages = form.watch("hero_slider");
  const watchedOfferImages = form.watch("offers");

  // Update form when data loads
  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const {
    fields: heroFieldsArray,
    append: appendHeroSlide,
    remove: removeHeroSlide,
  } = useFieldArray({
    control: form.control,
    name: "hero_slider",
  });

  const {
    fields: offerFieldsArray,
    append: appendOfferItem,
    remove: removeOfferItem,
  } = useFieldArray({
    control: form.control,
    name: "offers",
  });

  const {
    fields: discountFieldsArray,
    append: appendDiscountCard,
    remove: removeDiscountCard,
  } = useFieldArray({
    control: form.control,
    name: "discout_cards",
  });

  const onSubmit = async (formData: MetadataFormData) => {
    try {
      await updateMetadata.mutateAsync(formData);
      toast.success("Metadata updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update metadata");
    }
  };

  const tabs = [
    { id: "hero" as const, label: "Hero Slider", count: data?.hero_slider?.length || 0 },
    { id: "offers" as const, label: "Offers", count: data?.offers?.length || 0 },
    { id: "discounts" as const, label: "Discount Cards", count: data?.discout_cards?.length || 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Metadata Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your homepage content including hero slider, offers, and discount cards
          </p>
        </div>
        <Button 
          onClick={form.handleSubmit(onSubmit)} 
          disabled={isLoading || updateMetadata.isPending}
          className="bg-[#003d29] hover:bg-[#002a1c] text-white"
        >
          <SaveEnergy01Icon className="size-4" />
          {updateMetadata.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-[#003d29] text-[#003d29]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Hero Slider Tab */}
          {activeTab === "hero" && (
            <div className="space-y-4">
              {heroFieldsArray.map((field, index) => (
                <div key={field.id} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Slide {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeHeroSlide(index)}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Background Color</label>
                      <Input {...form.register(`hero_slider.${index}.bg_color`)} placeholder="#003d29" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Image URL</label>
                      <Input {...form.register(`hero_slider.${index}.image_url`)} placeholder="https://..." />
                      {watchedHeroImages[index]?.image_url && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Preview:</p>
                          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                            <Image
                              src={watchedHeroImages[index].image_url}
                              alt={`Hero slide ${index + 1}`}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.png";
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <Input {...form.register(`hero_slider.${index}.title`)} placeholder="Slide title" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      {...form.register(`hero_slider.${index}.description`)}
                      placeholder="Slide description"
                      className="w-full min-h-[80px] px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">CTA Button Text</label>
                      <Input {...form.register(`hero_slider.${index}.cta_btn.text`)} placeholder="Shop Now" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">CTA Button Link</label>
                      <Input {...form.register(`hero_slider.${index}.cta_btn.link`)} placeholder="/shop" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">CTA Button Color</label>
                      <Input {...form.register(`hero_slider.${index}.cta_btn.color`)} placeholder="#ffffff" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">CTA Button BG Color</label>
                      <Input {...form.register(`hero_slider.${index}.cta_btn.bg_color`)} placeholder="#003d29" />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendHeroSlide({
                    bg_color: "#003d29",
                    title: "",
                    description: "",
                    cta_btn: { color: "#ffffff", text: "Shop Now", bg_color: "#003d29", link: "/shop" },
                    image_url: "",
                  })
                }
              >
                Add Hero Slide
              </Button>
            </div>
          )}

          {/* Offers Tab */}
          {activeTab === "offers" && (
            <div className="space-y-4">
              {offerFieldsArray.map((field, index) => (
                <div key={field.id} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Offer {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeOfferItem(index)}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Sub Title</label>
                    <Input {...form.register(`offers.${index}.sub_title`)} placeholder="Limited Time Offer" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <Input {...form.register(`offers.${index}.title`)} placeholder="Special Deal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      {...form.register(`offers.${index}.description`)}
                      placeholder="Offer description"
                      className="w-full min-h-[80px] px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Product Image URL</label>
                      <Input {...form.register(`offers.${index}.product_image`)} placeholder="https://..." />
                      {watchedOfferImages[index]?.product_image && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Preview:</p>
                          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                            <Image
                              src={watchedOfferImages[index].product_image}
                              alt={`Offer ${index + 1}`}
                              fill
                              className="object-contain p-2"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.png";
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Primary Color</label>
                      <Input {...form.register(`offers.${index}.primary_color`)} placeholder="#d4e157" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Secondary Color</label>
                    <Input {...form.register(`offers.${index}.secondary_color`)} placeholder="#003d29" />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendOfferItem({
                    _id: `offer-${Date.now()}`,
                    sub_title: "",
                    title: "",
                    description: "",
                    product_image: "",
                    primary_color: "#d4e157",
                    secondary_color: "#003d29",
                  })
                }
              >
                Add Offer
              </Button>
            </div>
          )}

          {/* Discount Cards Tab */}
          {activeTab === "discounts" && (
            <div className="space-y-4">
              {discountFieldsArray.map((field, index) => (
                <div key={field.id} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Discount Card {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeDiscountCard(index)}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Type</label>
                      <Input {...form.register(`discout_cards.${index}.type`)} placeholder="percentage" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Icon</label>
                      <Input {...form.register(`discout_cards.${index}.icon`)} placeholder="🏷️" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <Input {...form.register(`discout_cards.${index}.title`)} placeholder="Get 20% Off" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      {...form.register(`discout_cards.${index}.description`)}
                      placeholder="Discount description"
                      className="w-full min-h-[80px] px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003d29]/20 focus:border-[#003d29]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Background Color</label>
                    <Input {...form.register(`discout_cards.${index}.bg_color`)} placeholder="#f5f5f5" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">CTA Button Text</label>
                      <Input {...form.register(`discout_cards.${index}.cta_btn.text`)} placeholder="Shop Now" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">CTA Button Link</label>
                      <Input {...form.register(`discout_cards.${index}.cta_btn.link`)} placeholder="/shop" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">CTA Button Color</label>
                      <Input {...form.register(`discout_cards.${index}.cta_btn.color`)} placeholder="#003d29" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">CTA Button BG Color</label>
                      <Input {...form.register(`discout_cards.${index}.cta_btn.bg_color`)} placeholder="#ffffff" />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendDiscountCard({
                    _id: `discount-${Date.now()}`,
                    type: "percentage",
                    icon: "🏷️",
                    title: "",
                    description: "",
                    bg_color: "#f5f5f5",
                    cta_btn: { color: "#003d29", text: "Shop Now", bg_color: "#ffffff", link: "/shop" },
                  })
                }
              >
                Add Discount Card
              </Button>
            </div>
          )}

        </form>
      )}
    </div>
  );
}
