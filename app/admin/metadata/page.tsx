"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  useAdminMetadata,
  useUpdateMetadata,
} from "@/hooks/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import {
  SaveEnergy01Icon,
  Add01Icon,
  Delete01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  Upload01Icon,
  Link02Icon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";

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

// ==================== ImagePicker ====================

function ImagePicker({
  value,
  onChange,
  label,
  folder = "/metadata",
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  folder?: string;
}) {
  const [mode, setMode] = useState<"url" | "upload">(value ? "url" : "upload");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const base64 = await toBase64(file);
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64, fileName: file.name, folder }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Upload failed");
      onChange(data.url);
      setMode("url");
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </label>
      )}

      {/* Image preview */}
      {value && (
        <div className="relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 mb-2 group">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1.5 right-1.5 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          >
            <Delete01Icon className="size-3.5 text-white" />
          </button>
        </div>
      )}

      {/* Mode toggle */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-gray-50/50">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium transition-colors",
            mode === "upload"
              ? "bg-white text-emerald-700 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          <Upload01Icon className="size-3.5" />
          Upload
        </button>
        <div className="w-px bg-gray-200" />
        <button
          type="button"
          onClick={() => setMode("url")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium transition-colors",
            mode === "url"
              ? "bg-white text-emerald-700 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          <Link02Icon className="size-3.5" />
          URL
        </button>
      </div>

      {/* Upload mode */}
      {mode === "upload" && (
        <div
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-1.5 py-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-emerald-600/40 hover:bg-emerald-50/30 cursor-pointer transition-all"
        >
          {uploading ? (
            <>
              <div className="size-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-500">Uploading...</span>
            </>
          ) : (
            <>
              <Upload01Icon className="size-5 text-gray-400" />
              <span className="text-xs text-gray-500">
                Click to upload image
              </span>
              <span className="text-[10px] text-gray-400">
                JPG, PNG, WebP
              </span>
            </>
          )}
        </div>
      )}

      {/* URL mode */}
      {mode === "url" && (
        <div className="flex items-center gap-2">
          <Link02Icon className="size-4 text-gray-400 shrink-0" />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className="text-sm h-9"
          />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}

// ==================== Color Input ====================

function ColorInput({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 size-9 cursor-pointer opacity-0"
        />
        <div
          className="size-9 rounded-lg border border-gray-200 shadow-sm cursor-pointer ring-1 ring-black/5"
          style={{ backgroundColor: value || "#000000" }}
        />
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label || "#hex"}
        className="font-mono text-xs h-9"
      />
    </div>
  );
}

// ==================== Reorder Controls ====================

function ReorderControls({
  index,
  total,
  onMoveUp,
  onMoveDown,
}: {
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        disabled={index === 0}
        onClick={onMoveUp}
        className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ArrowUp01Icon className="size-3.5" />
      </button>
      <button
        type="button"
        disabled={index === total - 1}
        onClick={onMoveDown}
        className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ArrowDown01Icon className="size-3.5" />
      </button>
    </div>
  );
}

// ==================== Hero Slide Editor ====================

function HeroSlideEditor({
  index,
  total,
  form,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  index: number;
  total: number;
  form: ReturnType<typeof useForm<MetadataFormData>>;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const { register, watch } = form;
  const slide = watch(`hero_slider.${index}`);
  const [collapsed, setCollapsed] = useState(false);

  const hasImage = slide?.image_url;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/70 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Preview */}
      <div className="relative w-full bg-gray-100">
        {hasImage ? (
          <div className="relative w-full aspect-[16/5]">
            <Image
              src={slide?.image_url || ""}
              alt=""
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 bg-gray-50">
            <div className="text-center">
              <Upload01Icon className="size-8 text-gray-300 mx-auto" />
              <p className="text-sm text-gray-400 mt-2">No image uploaded</p>
            </div>
          </div>
        )}

        {/* Slide number badge */}
        <div className="absolute top-3 left-3 z-10 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          Slide {index + 1} / {total}
        </div>
      </div>

      {/* Editor */}
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              Slide {index + 1} Settings
            </span>
          </div>
          <div className="flex items-center gap-1">
            <ReorderControls
              index={index}
              total={total}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
            />
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg
                className={cn("size-4 transition-transform", collapsed && "-rotate-90")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {!collapsed && (
          <>
            {/* Image Upload */}
            <ImagePicker
              value={slide?.image_url || ""}
              onChange={(v) => form.setValue(`hero_slider.${index}.image_url`, v)}
              label="Slide Image"
              folder="/metadata/hero"
            />

            {/* Link */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link
              </label>
              <div className="flex items-center gap-2">
                <Link02Icon className="size-4 text-gray-400 shrink-0" />
                <Input
                  {...register(`hero_slider.${index}.link`)}
                  placeholder="/shop"
                  className="text-sm h-9"
                />
              </div>
              <p className="text-[10px] text-gray-400">
                Optional. Where users go when they click the slide. Defaults to /shop
              </p>
            </div>

            {/* Remove */}
            <div className="pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={onRemove}
                className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
              >
                <Delete01Icon className="size-3.5" />
                Remove this slide
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ==================== Offer Editor ====================

function OfferEditor({
  index,
  total,
  form,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  index: number;
  total: number;
  form: ReturnType<typeof useForm<MetadataFormData>>;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const { register, watch } = form;
  const offer = watch(`offers.${index}`);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/70 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Offer Preview — matches promo-banners.tsx rendering exactly */}
      <div className="relative flex flex-col overflow-hidden rounded-2xl" style={{ backgroundColor: offer?.secondary_color || "#f5f5f5" }}>
        {/* Top Section */}
        <div className="px-6 py-8 relative z-10">
          <div className="absolute right-4 top-4">
            <div className="size-12 opacity-30" style={{ color: offer?.primary_color || "#003d29" }}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 6.5L21 9l-5 4.5L17.5 21 12 16.5 6.5 21 8 13.5 3 9l6.5-.5z"/></svg>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900">{offer?.sub_title || <span className="opacity-30">Sub Title</span>}</h3>
          <p className="text-4xl font-black mb-3" style={{ color: offer?.primary_color || "#003d29" }}>
            {offer?.title || <span className="opacity-30">Title</span>}
          </p>
          <p className="text-sm font-medium text-gray-600 leading-relaxed pr-16">
            {offer?.description || <span className="opacity-30">Description text</span>}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto relative h-40 w-full" style={{ backgroundColor: offer?.primary_color || "#003d29" }}>
          <div className="relative h-full w-full flex items-center justify-center p-4">
            <div className="relative size-28 grid place-items-center">
              {offer?.product_image ? (
                <Image src={offer.product_image} width={120} height={120} alt="" className="h-full w-fit object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/10 rounded-xl">
                  <span className="text-white/30 text-xs">Product Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            Offer {index + 1} Settings
          </span>
          <div className="flex items-center gap-1">
            <ReorderControls
              index={index}
              total={total}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
            />
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg
                className={cn("size-4 transition-transform", collapsed && "-rotate-90")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {!collapsed && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sub Title
                </label>
                <Input
                  {...register(`offers.${index}.sub_title`)}
                  placeholder="Limited Time Offer"
                  className="text-sm h-9"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </label>
                <Input
                  {...register(`offers.${index}.title`)}
                  placeholder="Special Deal"
                  className="text-sm h-9"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </label>
              <textarea
                {...register(`offers.${index}.description`)}
                placeholder="Offer description"
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 resize-none"
              />
            </div>

            <ImagePicker
              value={offer?.product_image || ""}
              onChange={(v) => form.setValue(`offers.${index}.product_image`, v)}
              label="Product Image"
              folder="/metadata/offers"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Primary Color
                </label>
                <ColorInput
                  value={offer?.primary_color || "#d4e157"}
                  onChange={(v) =>
                    form.setValue(`offers.${index}.primary_color`, v)
                  }
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Secondary Color
                </label>
                <ColorInput
                  value={offer?.secondary_color || "#003d29"}
                  onChange={(v) =>
                    form.setValue(`offers.${index}.secondary_color`, v)
                  }
                />
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={onRemove}
                className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
              >
                <Delete01Icon className="size-3.5" />
                Remove this offer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ==================== Discount Card Editor ====================

function DiscountCardEditor({
  index,
  total,
  form,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  index: number;
  total: number;
  form: ReturnType<typeof useForm<MetadataFormData>>;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const { register, watch } = form;
  const card = watch(`discout_cards.${index}`);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/70 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Discount Card Preview — matches discount-grid.tsx rendering exactly */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 md:p-10 text-white shadow-sm"
        style={{ backgroundColor: card?.bg_color || "#f5f5f5" }}
      >
        {/* SVG blob pattern decoration */}
        <div className="absolute right-0 top-0 h-full w-2/3 opacity-10">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            <path
              fill="currentColor"
              d="M45.7,-70.5C58.9,-62.5,69.3,-49.4,75.9,-34.7C82.5,-20,85.4,-3.7,81.6,10.6C77.9,24.9,67.5,37.2,56.2,47.3C44.9,57.4,32.7,65.2,19.4,69.1C6.1,73,-8.3,73,-21.8,68.4C-35.3,63.8,-47.9,54.6,-58.1,43.2C-68.3,31.8,-76.1,18.2,-78.9,3.3C-81.7,-11.6,-79.5,-27.8,-70.7,-40.7C-61.9,-53.6,-46.5,-63.2,-31.2,-69.6C-15.9,-76,-0.7,-79.2,14.2,-78.1L45.7,-70.5Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-sm">
          {/* Type badge */}
          <div
            className="mb-4 inline-flex items-center rounded-md px-3 py-1 text-xs font-bold"
            style={{
              backgroundColor: card?.cta_btn?.bg_color || "#ffffff",
              color: card?.cta_btn?.color || "#003d29",
            }}
          >
            <span className="mr-2">
              {card?.icon === "delivery" ? "📦" : card?.icon === "discount" ? "🏷️" : "💳"}
            </span>
            {card?.type || "percent"}
          </div>

          <h3 className="mb-2 text-3xl font-bold leading-tight md:text-4xl">
            {card?.title || <span className="opacity-30">Card Title</span>}
          </h3>
          <p className="mb-6 text-lg font-medium">
            {card?.description || <span className="opacity-30">Description</span>}
          </p>

          <span
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90"
            style={{
              backgroundColor: card?.cta_btn?.bg_color || "#ffffff",
              color: card?.cta_btn?.color || "#003d29",
            }}
          >
            {card?.cta_btn?.text || "Shop now"}
          </span>
        </div>

        {/* 3D Icon Placeholder */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
          <div
            className="size-24 md:size-32 bg-opacity-30 rounded-xl shadow-2xl flex items-center justify-center transform rotate-12 opacity-50 backdrop:blur-2xl"
            style={{ backgroundColor: card?.cta_btn?.bg_color || "#ffffff" }}
          >
            <span className="text-3xl">
              {card?.icon === "delivery" ? "🎁" : "⏰"}
            </span>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            Discount Card {index + 1} Settings
          </span>
          <div className="flex items-center gap-1">
            <ReorderControls
              index={index}
              total={total}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
            />
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <svg
                className={cn("size-4 transition-transform", collapsed && "-rotate-90")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {!collapsed && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </label>
                <Input
                  {...register(`discout_cards.${index}.type`)}
                  placeholder="percentage"
                  className="text-sm h-9"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Icon
                </label>
                <Input
                  {...register(`discout_cards.${index}.icon`)}
                  placeholder="🏷️"
                  className="text-sm h-9"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </label>
              <Input
                {...register(`discout_cards.${index}.title`)}
                placeholder="Get 20% Off"
                className="text-sm h-9"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </label>
              <textarea
                {...register(`discout_cards.${index}.description`)}
                placeholder="Discount card description"
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Background Color
              </label>
              <ColorInput
                value={card?.bg_color || "#f5f5f5"}
                onChange={(v) => form.setValue(`discout_cards.${index}.bg_color`, v)}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                CTA Button
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Text</label>
                  <Input
                    {...register(`discout_cards.${index}.cta_btn.text`)}
                    placeholder="Shop Now"
                    className="text-sm h-9"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Link</label>
                  <Input
                    {...register(`discout_cards.${index}.cta_btn.link`)}
                    placeholder="/shop"
                    className="text-sm h-9"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">Text Color</label>
                  <ColorInput
                    value={card?.cta_btn?.color || "#003d29"}
                    onChange={(v) =>
                      form.setValue(`discout_cards.${index}.cta_btn.color`, v)
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-400">BG Color</label>
                  <ColorInput
                    value={card?.cta_btn?.bg_color || "#ffffff"}
                    onChange={(v) =>
                      form.setValue(`discout_cards.${index}.cta_btn.bg_color`, v)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={onRemove}
                className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
              >
                <Delete01Icon className="size-3.5" />
                Remove this card
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update metadata");
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
            Design your homepage sections — changes are previewed live as you edit
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
            <div className="space-y-5">
              {heroFields.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm mb-4">
                    No hero slides yet. Add your first slide to get started.
                  </p>
                </div>
              )}

              {heroFields.map((field, index) => (
                <HeroSlideEditor
                  key={field.id}
                  index={index}
                  total={heroFields.length}
                  form={form}
                  onRemove={() => removeHero(index)}
                  onMoveUp={() => moveHero(index, index - 1)}
                  onMoveDown={() => moveHero(index, index + 1)}
                />
              ))}

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
            <div className="space-y-5">
              {offerFields.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm mb-4">
                    No offers yet. Create your first promotional offer.
                  </p>
                </div>
              )}

              {offerFields.map((field, index) => (
                <OfferEditor
                  key={field.id}
                  index={index}
                  total={offerFields.length}
                  form={form}
                  onRemove={() => removeOffer(index)}
                  onMoveUp={() => moveOffer(index, index - 1)}
                  onMoveDown={() => moveOffer(index, index + 1)}
                />
              ))}

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
            <div className="space-y-5">
              {discountFields.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm mb-4">
                    No discount cards yet. Add your first discount offer.
                  </p>
                </div>
              )}

              {discountFields.map((field, index) => (
                <DiscountCardEditor
                  key={field.id}
                  index={index}
                  total={discountFields.length}
                  form={form}
                  onRemove={() => removeDiscount(index)}
                  onMoveUp={() => moveDiscount(index, index - 1)}
                  onMoveDown={() => moveDiscount(index, index + 1)}
                />
              ))}

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
