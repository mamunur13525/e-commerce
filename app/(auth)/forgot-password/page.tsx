"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useForgotPassword } from "@/hooks/api/queries";

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPasswordMutation.mutateAsync({ email: data.email });
      setEmailSent(true);
      setSubmittedEmail(data.email);
      toast.success("Password reset email sent successfully!");
      reset();
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  if (emailSent) {
    return (
      <div className="bg-white p-8 w-full max-w-[480px] border rounded-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Check your email
          </h2>
          <p className="text-gray-500">
            We've sent a password reset link to <strong>{submittedEmail}</strong>
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            The link will expire in 10 minutes.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600 text-center text-sm">
            Didn't receive an email? Check your spam folder or{" "}
            <button
              onClick={() => {
                setEmailSent(false);
                setSubmittedEmail("");
              }}
              className="text-[#003d29] font-semibold hover:underline"
            >
              try again
            </button>
          </p>

          <Link href="/login">
            <Button
              type="button"
              className="w-full h-12 text-base font-semibold bg-[#003d29] hover:bg-[#002a1c] text-white shadow-md shadow-emerald-900/20"
            >
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 w-full max-w-[480px] border rounded-2xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Reset your password
        </h2>
        <p className="text-gray-500">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="email" className="font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="h-12 bg-white border-gray-200"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Button
            type="submit"
            disabled={forgotPasswordMutation.isPending}
            className="w-full h-12 text-base font-semibold bg-[#003d29] hover:bg-[#002a1c] text-white shadow-md shadow-emerald-900/20 disabled:opacity-50"
          >
            {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
          </Button>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500">Remember your password? </span>
          <Link
            href="/login"
            className="font-semibold text-[#003d29] hover:underline"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
