"use client";

import Link from "next/link";
import { ArrowLeft01Icon } from "hugeicons-react";

interface ProductNotFoundProps {
  message?: string;
  errorMessage?: string;
}

export function ProductNotFound({
  message,
  errorMessage,
}: ProductNotFoundProps) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {errorMessage === "Product not found"
            ? "Product Not Found"
            : "Oops! Something went wrong"}
        </h1>
        <p className="text-gray-600 mb-6">
          {message || "Unable to load product details"}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#003d29] text-white rounded-lg hover:bg-[#002d1f] transition-colors"
        >
          <ArrowLeft01Icon className="size-5" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}