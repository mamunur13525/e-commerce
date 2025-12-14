"use client";

import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";

const CATEGORIES = [
    {
        id: "indoor",
        name: "Indoor Plants",
        subtitle: "Fresh air, fresh mind",
        color: "bg-emerald-50 hover:bg-emerald-100",
        icon: "🪴",
        count: 42,
        slug: "indoor-plants"
    },
    {
        id: "outdoor",
        name: "Outdoor Plants",
        subtitle: "For your garden & patio",
        color: "bg-orange-50 hover:bg-orange-100",
        icon: "🌳",
        count: 28,
        slug: "outdoor-plants"
    },
    {
        id: "succulents",
        name: "Succulents & Cacti",
        subtitle: "Low maintenance beauties",
        color: "bg-yellow-50 hover:bg-yellow-100",
        icon: "🌵",
        count: 15,
        slug: "succulents"
    },
    {
        id: "pots",
        name: "Pots & Planters",
        subtitle: "Stylish homes for plants",
        color: "bg-stone-50 hover:bg-stone-100",
        icon: "🏺",
        count: 64,
        slug: "pots-planters"
    },
    {
        id: "seeds",
        name: "Seeds & Bulbs",
        subtitle: "Grow from scratch",
        color: "bg-sky-50 hover:bg-sky-100",
        icon: "🌱",
        count: 32,
        slug: "seeds-bulbs"
    },
    {
        id: "tools",
        name: "Garden Tools",
        subtitle: "Essentials for care",
        color: "bg-slate-50 hover:bg-slate-100",
        icon: "✂️",
        count: 12,
        slug: "garden-tools"
    },
];

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold text-[#003d29] mb-4">Browse Categories</h1>
                    <p className="text-gray-500">
                        Explore our wide selection of plants, tools, and accessories.
                        Find exactly what you need to create your perfect green space.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CATEGORIES.map((category) => (
                        <Link
                            key={category.id}
                            href={`/shop?category=${category.slug}`}
                            className={`group relative flex items-center justify-between p-8 rounded-3xl transition-all duration-300 ${category.color}`}
                        >
                            <div className="flex flex-col z-10">
                                <h3 className="text-2xl font-bold text-[#003d29] mb-2 group-hover:translate-x-1 transition-transform">
                                    {category.name}
                                </h3>
                                <p className="text-gray-600 font-medium mb-1">
                                    {category.subtitle}
                                </p>
                                <span className="text-sm text-gray-400">
                                    {category.count} Products
                                </span>
                            </div>

                            <div className="absolute right-6 bottom-4 text-[80px] leading-none group-hover:scale-110 group-hover:-rotate-3 transition-transform opacity-90 select-none">
                                {category.icon}
                            </div>

                            <div className="absolute top-8 right-8 text-[#003d29] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">
                                <ArrowRight01Icon className="size-6" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
