"use client";

import Link from "next/link";

interface ProductBreadcrumbProps {
  productName: string;
}

export function ProductBreadcrumb({ productName }: ProductBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600">
      <Link href="/" className="hover:text-[#003d29]">
        Home
      </Link>
      <span>/</span>
      <Link href="/shop" className="hover:text-[#003d29]">
        Shop
      </Link>
      <span>/</span>
      <span className="text-gray-900 font-medium">{productName}</span>
    </nav>
  );
}