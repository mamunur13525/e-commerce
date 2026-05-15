"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/countries";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { FloatingTextarea } from "@/components/ui/floating-textarea";
import { Label } from "@/components/ui/label";
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
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

interface FormData {
  storeName: string;
  description?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  website?: string;
}

export default function BecomeSellerPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedLogo, setUploadedLogo] = useState<{ url: string; id: string; display_url: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      storeName: "",
      description: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      website: "",
    },
  });

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

    setImageFile(file);
    setUploadedLogo(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setUploadedLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: FormData) => {
    if (!isAuthenticated || !user) {
      toast.error("Please login first to submit a seller request");
      router.push("/login?callbackUrl=%2Fbecome-seller");
      return;
    }

    setIsSubmitting(true);

    try {
      let logo: { url: string; id: string; display_url: string } | undefined = uploadedLogo || undefined;

      if (imageFile && !logo) {
        // Convert file to base64
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            base64,
            fileName: `vendor-logo-${Date.now()}-${imageFile.name}`,
            folder: "/vendors",
          }),
        });

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok || !uploadData.url) {
          toast.error(uploadData.message || "Failed to upload logo");
          return;
        }

        logo = {
          url: uploadData.url,
          id: uploadData.id,
          display_url: uploadData.display_url,
        };
        setUploadedLogo(logo);
      }

      // Step 2: Submit vendor request
      const res = await fetch("/api/vendors/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          userId: user._id,
          logo,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to submit request");
        return;
      }

      setIsSubmitted(true);
      toast.success(result.message);
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
                  href="/login?callbackUrl=%2Fbecome-seller"
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      if (e.key === "Enter" || e.key === " ")
                        fileInputRef.current?.click();
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

              <FieldGroup>
                {/* Store Name */}
                <Field>
                  <FloatingInput
                    id="storeName"
                    label="Store Name *"
                    startIcon={<Store04Icon className="size-5" />}
                    {...register("storeName", {
                      required: "Store name is required",
                      validate: (value) =>
                        !!value?.trim() || "Store name is required",
                    })}
                    className={`${errors.storeName
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                      }`}
                  />
                  <FieldError>{errors.storeName?.message}</FieldError>
                </Field>

                {/* Description */}
                <Field>
                  <FloatingTextarea
                    id="description"
                    label="Store Description"
                    {...register("description")}
                    rows={4}
                  />
                </Field>

                {/* Phone */}
                <Field>
                  <FloatingInput
                    id="phone"
                    type="tel"
                    label="Phone Number"
                    startIcon={<CallIcon className="size-5" />}
                    {...register("phone")}
                  />
                </Field>

                {/* Address */}
                <Field>
                  <FloatingInput
                    id="address"
                    label="Address"
                    startIcon={<Location01Icon className="size-5" />}
                    {...register("address")}
                  />
                </Field>

                {/* City & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FloatingInput
                      id="city"
                      label="City"
                      {...register("city")}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="country">Country</FieldLabel>
                    <Controller
                      control={control}
                      name="country"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger id="country" className="w-full">
                            <SelectValue>
                              {field.value || "Select a country"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                </div>

                {/* Website */}
                <Field>
                  <FloatingInput
                    id="website"
                    type="url"
                    label="Website (optional)"
                    startIcon={<GlobalIcon className="size-5" />}
                    {...register("website")}
                  />
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                disabled={isSubmitting || !isAuthenticated}
                className="w-full h-12 text-base font-semibold bg-[#003d29] hover:bg-[#002a1c] text-white shadow-md shadow-emerald-900/20 disabled:opacity-50"
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
