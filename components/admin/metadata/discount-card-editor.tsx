"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Delete01Icon } from "hugeicons-react";
import { ColorInput } from "./color-input";
import { Input } from "@/components/ui/input";

export function DiscountCardEditor({
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
  const card = watch(`discout_cards.${index}`);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all hover:border-gray-300 hover:shadow-md">
      {/* Preview — matches discount-grid.tsx exactly */}
      <div
        className="relative cursor-pointer"
        onClick={toggleExpand}
      >
        <div
          className="relative overflow-hidden rounded-t-xl p-8 text-white shadow-sm"
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
              className="size-24 md:size-32 bg-opacity-30 rounded-xl shadow-2xl flex items-center justify-center transform rotate-12 opacity-50"
              style={{ backgroundColor: card?.cta_btn?.bg_color || "#ffffff" }}
            >
              <span className="text-4xl">
                {card?.icon === "delivery" ? "🎁" : "⏰"}
              </span>
            </div>
          </div>
        </div>

        {/* Card number badge */}
        <div className="absolute top-3 left-3 z-20 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full pointer-events-none">
          Card {index + 1} / {total}
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
              onChange={(v) => setValue(`discout_cards.${index}.bg_color`, v)}
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
                    setValue(`discout_cards.${index}.cta_btn.color`, v)
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400">BG Color</label>
                <ColorInput
                  value={card?.cta_btn?.bg_color || "#ffffff"}
                  onChange={(v) =>
                    setValue(`discout_cards.${index}.cta_btn.bg_color`, v)
                  }
                />
              </div>
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
              Remove this card
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
