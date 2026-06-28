"use client";

import { useState, useRef, useCallback } from "react";
import {
  Upload01Icon,
  ImageAdd02Icon,
  Delete02Icon,
  Add01Icon,
} from "hugeicons-react";
import { toast } from "sonner";
import { UseFormSetValue, UseFormWatch, Control } from "react-hook-form";
import { ProductFormData } from "@/components/admin/products/types";

interface ImageUploadSectionProps {
  control: Control<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
}

export function ImageUploadSection({
  setValue,
  watch,
}: ImageUploadSectionProps) {
  const mainImage = watch("image");
  const additionalImages = watch("images") || [];
  const [mainUploading, setMainUploading] = useState(false);
  const [imagesUploading, setImagesUploading] = useState(false);
  const mainInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const dragCounter = useRef(0);

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadFile = async (file: File): Promise<string> => {
    const base64 = await toBase64(file);
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base64,
        fileName: file.name,
        folder: "/products",
      }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Upload failed");
    return data.url;
  };

  const handleMainImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainUploading(true);
    try {
      const url = await uploadFile(file);
      setValue("image", { url });
      toast.success("Main image uploaded");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload main image");
    } finally {
      setMainUploading(false);
      if (mainInputRef.current) mainInputRef.current.value = "";
    }
  };

  const handleAdditionalImagesUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;
    setImagesUploading(true);
    try {
      const urls = await Promise.all(fileArray.map((f) => uploadFile(f)));
      setValue("images", [...additionalImages, ...urls.map((url) => ({ url }))]);
      toast.success(`${urls.length} image(s) uploaded`);
    } catch (err: any) {
      toast.error(err.message || "Failed to upload images");
    } finally {
      setImagesUploading(false);
      if (imagesInputRef.current) imagesInputRef.current.value = "";
    }
  };

  const removeAdditionalImage = (idx: number) => {
    const updated = additionalImages.filter((_: any, i: number) => i !== idx);
    setValue("images", updated);
  };

  const removeMainImage = () => {
    setValue("image", { url: "" });
  };

  // Drag & Drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      dragCounter.current = 0;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleAdditionalImagesUpload(e.dataTransfer.files);
      }
    },
    [additionalImages, setValue]
  );

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-800">Product Images</h3>

      {/* Main Image */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Main Image
        </label>
        <div className="relative">
          {mainImage?.url ? (
            <div className="relative group rounded-xl overflow-hidden border-2 border-[#003d29]/20 bg-gray-50">
              <img
                src={mainImage.url}
                alt="Main product"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => mainInputRef.current?.click()}
                  className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <Upload01Icon className="size-5 text-gray-700" />
                </button>
                <button
                  type="button"
                  onClick={removeMainImage}
                  className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <Delete02Icon className="size-5 text-red-600" />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => mainInputRef.current?.click()}
              disabled={mainUploading}
              className="w-full aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-[#003d29]/50 hover:bg-[#003d29]/5 transition-all flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#003d29] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mainUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="size-8 border-2 border-[#003d29] border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">Uploading...</span>
                </div>
              ) : (
                <>
                  <ImageAdd02Icon className="size-8" />
                  <span className="text-xs font-medium">
                    Click to upload main image
                  </span>
                  <span className="text-[10px] text-gray-400">
                    JPG, PNG, WebP
                  </span>
                </>
              )}
            </button>
          )}
          <input
            ref={mainInputRef}
            type="file"
            accept="image/*"
            onChange={handleMainImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Additional Images */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          Additional Images ({additionalImages.length})
        </label>

        {/* Drop zone */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`relative rounded-xl border-2 border-dashed transition-all p-4 ${
            isDragOver
              ? "border-[#003d29] bg-[#003d29]/5 scale-[1.02]"
              : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
          }`}
        >
          {imagesUploading ? (
            <div className="flex flex-col items-center justify-center gap-2 py-6">
              <div className="size-7 border-2 border-[#003d29] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-gray-500">
                Uploading images...
              </span>
            </div>
          ) : additionalImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-1.5 py-6 text-gray-400">
              <Upload01Icon className="size-6" />
              <p className="text-xs font-medium">Drag & drop images here</p>
              <p className="text-[10px]">or click to browse</p>
              <button
                type="button"
                onClick={() => imagesInputRef.current?.click()}
                className="mt-1 px-3 py-1 text-[11px] font-medium text-[#003d29] border border-[#003d29]/30 rounded-lg hover:bg-[#003d29]/5 transition-colors"
              >
                Browse Files
              </button>
            </div>
          ) : (
            <>
              {/* Image grid */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {additionalImages.map(
                  (img: { url: string }, idx: number) => (
                    <div
                      key={idx}
                      className="relative group rounded-lg overflow-hidden border border-gray-200 bg-white"
                    >
                      <img
                        src={img.url}
                        alt={`Product ${idx + 1}`}
                        className="w-full aspect-square object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                      >
                        <Delete02Icon className="size-3 text-white" />
                      </button>
                    </div>
                  )
                )}
                {/* Add more button */}
                <button
                  type="button"
                  onClick={() => imagesInputRef.current?.click()}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-[#003d29]/50 hover:bg-[#003d29]/5 transition-all flex items-center justify-center text-gray-400 hover:text-[#003d29]"
                >
                  <Add01Icon className="size-5" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center">
                Drag & drop more images or{" "}
                <button
                  type="button"
                  onClick={() => imagesInputRef.current?.click()}
                  className="text-[#003d29] underline underline-offset-2 hover:no-underline"
                >
                  browse
                </button>
              </p>
            </>
          )}

          {/* Hidden file input - allow multiple */}
          <input
            ref={imagesInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleAdditionalImagesUpload(e.target.files);
              }
            }}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}