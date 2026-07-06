"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCreateCategory } from "@/hooks/api/admin";
import { toast } from "sonner";

interface CategoryFormData {
  type: string;
  name: string;
  subtitle: string;
  color: string;
  icon: string;
}

const defaultValues: CategoryFormData = {
  type: "",
  name: "",
  subtitle: "",
  color: "#d4e157",
  icon: "🌿",
};

interface AddCategoryItemProps {
  open: boolean;
  onClose: () => void;
}

const AddCategoryItem = ({ open, onClose }: AddCategoryItemProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const createCategory = useCreateCategory();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues,
  });

  const watchedName = watch("name");
  const watchedSubtitle = watch("subtitle");
  const watchedColor = watch("color");
  const watchedIcon = watch("icon");

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreate = async (formData: CategoryFormData) => {
    try {
      await createCategory.mutateAsync({
        ...formData,
        slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
        count: 0,
      });
      toast.success("Category created successfully");
      onClose();
      reset(defaultValues);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to create category");
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setValue("icon", emojiData.emoji, { shouldValidate: true });
    setShowEmojiPicker(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          reset(defaultValues);
          setShowEmojiPicker(false);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>Create a new product category.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreate)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Form Fields */}
            <div className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. Indoor Plants"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Type <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. plants"
                  {...register("type", { required: "Type is required" })}
                />
                {errors.type && (
                  <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
                )}
              </div>

              {/* Subtitle */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Subtitle <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. Bring nature inside"
                  {...register("subtitle", { required: "Subtitle is required" })}
                />
                {errors.subtitle && (
                  <p className="text-red-500 text-xs mt-1">{errors.subtitle.message}</p>
                )}
              </div>

              {/* Color */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Color <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={watchedColor}
                    onChange={(e) => setValue("color", e.target.value, { shouldValidate: true })}
                    className="w-10 h-9 rounded border border-gray-200 cursor-pointer bg-transparent"
                  />
                  <Input
                    placeholder="#d4e157"
                    value={watchedColor}
                    onChange={(e) => setValue("color", e.target.value, { shouldValidate: true })}
                  />
                </div>
                {errors.color && (
                  <p className="text-red-500 text-xs mt-1">{errors.color.message}</p>
                )}
              </div>

              {/* Icon with Emoji Picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Icon <span className="text-red-500">*</span>
                </label>
                <div className="relative" ref={emojiPickerRef}>
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="w-full flex items-center gap-3 px-3 py-2 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors text-left"
                  >
                    <span className="text-2xl">{watchedIcon || "🌿"}</span>
                    <span className="text-sm text-gray-500">Click to select an icon</span>
                  </button>

                  {showEmojiPicker && (
                    <div className="absolute top-full left-0 mt-1 z-50">
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        width={320}
                        height={400}
                        searchPlaceholder="Search emoji..."
                        previewConfig={{ showPreview: false }}
                      />
                    </div>
                  )}
                </div>
                {errors.icon && (
                  <p className="text-red-500 text-xs mt-1">{errors.icon.message}</p>
                )}
              </div>
            </div>

            {/* Right: Live Preview */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Preview</label>
              <div
                className="w-full flex items-center gap-3 px-4 pt-7 pb-14 rounded-xl shadow-lg shadow-zinc-200 relative"
                style={{ backgroundColor: watchedColor || "#d4e157" }}
              >
                <div className="flex-1 -translate-y-3">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">
                    {watchedName || "Category Name"}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {watchedSubtitle || "Category subtitle"}
                  </p>
                </div>
                <span className="absolute right-4 bottom-3 text-[60px]">
                  {watchedIcon || "🌿"}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                The category card will appear like this on the homepage.
              </p>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => { onClose(); reset(defaultValues); setShowEmojiPicker(false); }}>
              Cancel
            </Button>
            <Button type="submit" disabled={createCategory.isPending}>
              {createCategory.isPending ? "Creating..." : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryItem;