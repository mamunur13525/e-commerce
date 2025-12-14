"use client";

import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";

const CATEGORIES = [
  {
    name: "Vegetable",
    subtitle: "Local market",
    color: "bg-green-50",
    icon: "🥦",
  },
  {
    name: "Snacks & Breads",
    subtitle: "In store delivery",
    color: "bg-orange-50",
    icon: "🍞",
  },
  {
    name: "Fruits",
    subtitle: "Chemical free",
    color: "bg-yellow-50",
    icon: "🍊",
  },
  {
    name: "Chicken legs",
    subtitle: "Frozen Meal",
    color: "bg-red-50",
    icon: "🍗",
  },
];

export function CategoryRail() {
  return (
    <section className="container mx-auto px-6 md:px-12 py-12">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              href="#"
              className={`flex items-center gap-3 px-4 py-7 rounded-xl transition-transform hover:scale-105 ${cat.color} group relative`}
            >
              <div className="flex-1 -translate-y-3">
                <h3 className="font-bold text-gray-900 text-lg leading-tight">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{cat.subtitle}</p>
              </div>
              <span className="absolute right-4 bottom-3 text-[40px] group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
            </Link>
          ))}
          <Link
            href="#"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#d4e157] hover:bg-[#c0cc4b] transition-colors text-[#003d29] text-center gap-2 font-bold"
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
