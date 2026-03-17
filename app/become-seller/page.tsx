"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Store04Icon,
  CallIcon,
  Location01Icon,
  GlobalIcon,
  CheckmarkCircle02Icon,
  ArrowLeft01Icon,
  InformationCircleIcon,
  ImageUploadIcon,
  Cancel01Icon,
} from "hugeicons-react";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

interface FormData {
  storeName: string;
  description: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  website: string;
}

const initialFormData: FormData = {
  storeName: "",
  description: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  website: "",
};

export default function BecomeSellerPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setImageBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      toast.error("Please login first to submit a seller request");
      router.push("/login");
      return;
    }

    if (!formData.storeName.trim()) {
      toast.error("Store name is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/vendors/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: user._id,
          logo: imageBase64 ? { url: imageBase64 } : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to submit request");
        return;
      }

      setIsSubmitted(true);
      toast.success(data.message);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-lg text-center py-4">
          <CardHeader className="space-y-4">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100">
              <CheckmarkCircle02Icon className="size-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#003d29]">
              Request Submitted!
            </CardTitle>
            <CardDescription className="text-base">
              Your seller application has been submitted successfully. Our team
              will review your application and get back to you shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
              <div className="flex items-start gap-2">
                <InformationCircleIcon className="size-5 mt-0.5 shrink-0" />
                <p>
                  Review typically takes 1-2 business days. You&apos;ll receive
                  a notification once your application is approved.
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-[#003d29] hover:bg-[#002a1c] cursor-pointer"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-8 px-4 md:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft01Icon className="size-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-[#003d29]">
            Become a Seller
          </h1>
          <p className="text-muted-foreground text-base">
            Start selling your products on Gromuse. Fill out the form below to
            submit your seller application.
          </p>
        </div>

        {/* Login prompt for unauthenticated users */}
        {!isAuthenticated && (
          <Card className="mb-6 border-amber-200 bg-amber-50">
            <CardContent className="flex items-center gap-3 py-4">
              <InformationCircleIcon className="size-5 text-amber-600 shrink-0" />
              <p className="text-sm text-amber-800">
                You need to{" "}
                <Link
                  href="/login"
                  className="font-semibold underline underline-offset-2"
                >
                  sign in
                </Link>{" "}
                before submitting a seller request.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Store Information</CardTitle>
            <CardDescription>
              Tell us about your store and what you plan to sell.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Store Logo */}
              <div className="space-y-2">
                <Label>Store Logo</Label>
                <div className="flex items-center gap-4">
                  <div
                    className="relative size-20 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#003d29] transition-colors cursor-pointer flex items-center justify-center overflow-hidden bg-gray-50 group"
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload store logo"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                    }}
                  >
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Store logo preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <ImageUploadIcon className="size-6 text-gray-400 group-hover:text-[#003d29] transition-colors" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Upload your store logo (max 2MB)
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer"
                      >
                        Choose File
                      </Button>
                      {imagePreview && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeImage}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Cancel01Icon className="size-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              {/* Store Name */}
              <div className="space-y-2">
                <Label htmlFor="storeName">
                  Store Name <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Store04Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="storeName"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="Enter your store name"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Store Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your store, what products you sell, and what makes your store unique..."
                  rows={4}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <CallIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <Location01Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* City & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website">Website (optional)</Label>
                <div className="relative">
                  <GlobalIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#003d29] hover:bg-[#002a1c] cursor-pointer text-base py-5"
                disabled={isSubmitting || !isAuthenticated}
              >
                {isSubmitting ? "Submitting..." : "Submit Seller Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
