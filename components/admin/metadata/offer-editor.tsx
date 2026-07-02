"use client";

import { useState } from "react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { Delete01Icon, Sun01Icon, SparklesIcon, Award01Icon, Megaphone01Icon } from "hugeicons-react";
import { ImagePicker } from "./image-picker";
import { ColorInput } from "./color-input";
import { Input } from "@/components/ui/input";
import { isValidImageUrl } from "@/lib/utils";

const PREVIEW_ICONS = [Sun01Icon, SparklesIcon, Award01Icon, Megaphone01Icon];

export function OfferEditor({
  index,
  total,
  form,
  onRemove,
}: {
  index: number;
  total: number;
  form: UseFormReturn<any>;
  onRemove: () => void;
}) {
  const { register, watch, setValue } = form;
  const offer = watch(`offers.${index}`);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const Icon = PREVIEW_ICONS[index % PREVIEW_ICONS.length];

  return (
    <div className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all hover:border-gray-300 hover:shadow-md">
      {/* Preview — matches promo-banners.tsx exactly */}
      <div className="relative cursor-pointer" onClick={toggleExpand}>
        <div
          className="relative flex flex-col overflow-hidden rounded-t-xl"
          style={{ backgroundColor: offer?.secondary_color || "#f5f5f5" }}
        >
          {/* Top Section */}
          <div className="px-6 py-8 relative z-10">
            <div className="absolute right-4 top-4">
              <Icon className="size-12 opacity-30" style={{ color: offer?.primary_color || "#d4e157" }} />
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              {offer?.sub_title || <span className="opacity-30">Sub Title</span>}
            </h3>
            <p className="text-4xl font-black mb-3" style={{ color: offer?.primary_color || "#d4e157" }}>
              {offer?.title || <span className="opacity-30">Title</span>}
            </p>
            <p className="text-sm font-medium text-gray-600 leading-relaxed pr-16">
              {offer?.description || <span className="opacity-30">Description text</span>}
            </p>
          </div>

          {/* Bottom Section (Dark Wave/Curve) */}
          <div className="mt-auto relative h-40 w-full rounded-t-4xl" style={{ backgroundColor: offer?.primary_color || "#003d29" }}>
            <div className="relative h-full w-full flex items-center justify-center p-4">
              <div className="relative size-28 grid place-items-center">
                {offer?.product_image && isValidImageUrl(offer.product_image) ? (
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

        {/* Offer number badge */}
        <div className="absolute top-3 left-3 z-20 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full pointer-events-none">
          Offer {index + 1} / {total}
        </div>

        {/* Click to edit hint */}
        <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/5 transition-colors rounded-t-xl flex items-center justify-center">
          <span className="text-xs font-medium text-white/0 group-hover:text-white/80 transition-colors bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
            Click to edit
          </span>
        </div>
      </div>

      {/* Expandable Editor */}
      {isExpanded && (
        <div className="p-5 space-y-4 border-t border-gray-200">
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
            onChange={(v) => setValue(`offers.${index}.product_image`, v)}
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
                  setValue(`offers.${index}.primary_color`, v)
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
                  setValue(`offers.${index}.secondary_color`, v)
                }
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
            >
              <Delete01Icon className="size-3.5" />
              Remove this offer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
