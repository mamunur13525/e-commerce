"use client";

import { useState } from "react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { Delete01Icon, Upload01Icon, Link02Icon } from "hugeicons-react";
import { ImagePicker } from "./image-picker";
import { Input } from "@/components/ui/input";
import { isValidImageUrl } from "@/lib/utils";

export function HeroSlideEditor({
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
  const slide = watch(`hero_slider.${index}`);
  const [isExpanded, setIsExpanded] = useState(false);

  const imageUrl = slide?.image_url;
  const isValidUrl = imageUrl && isValidImageUrl(imageUrl);

  const hasImage = !!isValidUrl;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all hover:border-gray-300 hover:shadow-md">
      {/* Horizontal Preview */}
      <div className="relative w-full cursor-pointer" onClick={toggleExpand}>
        {hasImage ? (
          <div className="relative w-full aspect-[21/9]">
            <Image
              src={imageUrl}
              alt=""
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 bg-gray-50">
            <div className="text-center">
              <Upload01Icon className="size-6 text-gray-300 mx-auto" />
              <p className="text-xs text-gray-400 mt-1">No image</p>
            </div>
          </div>
        )}

        {/* Slide number badge */}
        <div className="absolute top-3 left-3 z-10 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full pointer-events-none">
          Slide {index + 1} / {total}
        </div>
      </div>

      {/* Expandable Editor */}
      {isExpanded && (
        <div className="p-5 space-y-4 border-t border-gray-200">
          {/* Image Upload */}
          <ImagePicker
            value={slide?.image_url || ""}
            onChange={(v) => setValue(`hero_slider.${index}.image_url`, v)}
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
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
            >
              <Delete01Icon className="size-3.5" />
              Remove this slide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
