"use client";

import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";
import { Category } from "@/lib/types/metadata";

export function CategoryRail({ categories }: { categories: Category[] }) {
  return (
    <section className="container mx-auto px-6 md:px-12 py-12">
      <div className="flex items-center justify-between gap-4">
        <div className="flex lg:flex-row flex-col w-full gap-4">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((cat: Category) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className={`w-full sm:max-w-[300px] min-w-[250px] bg-white flex items-center gap-3 px-4 pt-7 pb-14 rounded-xl transition-transform hover:scale-105 group relative shadow-lg shadow-zinc-200`}
              >
                <div className="flex-1 -translate-y-3">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{cat.subtitle}</p>
                </div>
                <span className="absolute right-4 bottom-3 text-[60px] group-hover:scale-110 group-hover:-rotate-5 transition-transform">
                  {cat.icon}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/categories"
            className="w-[100px] flex flex-col items-center justify-center p-4 rounded-xl bg-[#d4e157] hover:bg-[#c0cc4b] transition-colors text-[#003d29] text-center gap-2 font-bold"
          >
            <div className="size-8 bg-white/30 rounded-full flex items-center justify-center">
              <ArrowRight01Icon className="size-5" />
            </div>
            See all
          </Link>
        </div>
        {/* See All Button */}
      </div>
    </section>
  );
}
