"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload01Icon, Link02Icon, Delete01Icon } from "hugeicons-react";
import { cn, isValidImageUrl } from "@/lib/utils";

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function ImagePicker({
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
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Failed to upload image");
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
      {isValidImageUrl(value) && (
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