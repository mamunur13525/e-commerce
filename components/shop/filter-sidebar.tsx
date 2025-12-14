"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft01Icon,
    DeliveryTruck01Icon,
    HeadphonesIcon,
    RefreshIcon,
} from "hugeicons-react";
import { cn } from "@/lib/utils";

export function FilterSidebar() {
    return (
        <Suspense fallback={<div>Loading filters...</div>}>
            <FilterSidebarContent />
        </Suspense>
    );
}

function FilterSidebarContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Helper to update URL params
    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        // Handle multiple values for same key (arrays)
        if (value === null) {
            params.delete(name);
        } else {
            // For simplicity in this demo, we'll just set it. 
            // In a real complex app, you might want toggle logic for arrays.
            params.set(name, value);
        }

        return params.toString();
    };

    // Helper for specialized toggle logic (arrays like categories)
    const toggleFilter = (section: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const current = params.get(section);

        if (current === value) {
            params.delete(section); // rudimentary toggle off
        } else {
            params.set(section, value); // rudimentary toggle on (single select behavior for simplicity or replace)
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const [priceRange, setPriceRange] = useState([
        Number(searchParams.get("minPrice") || 0),
        Number(searchParams.get("maxPrice") || 500)
    ]);

    // Debounce price update
    const handlePriceChange = (value: number | readonly number[]) => {
        const val = value as number[];
        setPriceRange(val);
        // In real app, debounce this URL update
        const params = new URLSearchParams(searchParams.toString());
        params.set("minPrice", val[0].toString());
        params.set("maxPrice", val[1].toString());
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // Check if a value is active
    const isActive = (section: string, value: string) => {
        return searchParams.get(section) === value;
    };

    return (
        <div className="w-full bg-white p-4 rounded-xl border border-gray-100 h-fit">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-[#003d29]">Filters</h2>
                <button
                    onClick={() => router.push(pathname)}
                    className="text-xs text-gray-500 hover:text-[#003d29] underline"
                >
                    Clear All
                </button>
            </div>

            <Accordion defaultValue={["collections", "categories", "price"]} className="w-full">

                {/* Collections */}
                <AccordionItem value="collections" className="border-b-gray-100">
                    <AccordionTrigger className="hover:no-underline text-[#003d29] font-bold">Collections</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {["All", "Pet Friendly", "Low Light", "Rare Finds", "Succulents", "Air Purifying"].map(
                                (tag, i) => {
                                    const active = isActive("collection", tag) || (tag === "All" && !searchParams.has("collection"));
                                    return (
                                        <button
                                            key={tag}
                                            onClick={() => {
                                                if (tag === "All") {
                                                    const params = new URLSearchParams(searchParams.toString());
                                                    params.delete("collection");
                                                    router.replace(`${pathname}?${params.toString()}`);
                                                } else {
                                                    toggleFilter("collection", tag);
                                                }
                                            }}
                                            className={cn(
                                                "px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
                                                active
                                                    ? "bg-[#aedf4d] text-[#003d29] border-[#aedf4d]"
                                                    : "bg-white text-gray-600 border-gray-200 hover:border-[#003d29] hover:text-[#003d29]"
                                            )}
                                        >
                                            {tag}
                                        </button>
                                    )
                                }
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Categories */}
                <AccordionItem value="categories" className="border-b-gray-100">
                    <AccordionTrigger className="hover:no-underline text-[#003d29] font-bold">Categories</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            {[
                                { name: "Indoor Plants", count: 42, slug: "indoor-plants" },
                                { name: "Outdoor Plants", count: 28, slug: "outdoor-plants" },
                                { name: "Succulents & Cacti", count: 15, slug: "succulents" },
                                { name: "Pots & Planters", count: 64, slug: "pots-planters" },
                                { name: "Seeds & Bulbs", count: 32, slug: "seeds-bulbs" },
                                { name: "Garden Tools", count: 12, slug: "garden-tools" },
                                { name: "Fertilizers & Soil", count: 18, slug: "fertilizers" },
                            ].map((cat) => (
                                <div
                                    key={cat.name}
                                    className="flex items-center justify-between group cursor-pointer"
                                    onClick={() => toggleFilter("category", cat.slug)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id={cat.name}
                                            checked={isActive("category", cat.slug)}
                                            onCheckedChange={() => toggleFilter("category", cat.slug)}
                                            className="rounded-[4px] border-gray-300 data-[state=checked]:bg-[#003d29] data-[state=checked]:border-[#003d29]"
                                        />
                                        <label
                                            htmlFor={cat.name}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600 group-hover:text-[#003d29] cursor-pointer"
                                        >
                                            {cat.name}
                                        </label>
                                    </div>
                                    <span className="text-xs bg-gray-100 text-gray-500 py-0.5 px-2 rounded-full font-medium group-hover:bg-[#e0e0e0]">
                                        {cat.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Price */}
                <AccordionItem value="price" className="border-b-gray-100">
                    <AccordionTrigger className="hover:no-underline text-[#003d29] font-bold">Price</AccordionTrigger>
                    <AccordionContent>
                        <div className="px-2 py-4">
                            <Slider
                                defaultValue={[0, 500]}
                                max={1000}
                                step={10}
                                value={priceRange}
                                onValueChange={handlePriceChange}
                                className="[&_.block]:bg-[#003d29] [&_.block]:border-white [&_.block]:ring-4 [&_.block]:ring-[#aedf4d] [&_.h-2]:bg-gray-100 [&_.h-2]:h-1"
                            />
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                                <Input
                                    type="number"
                                    value={priceRange[0]}
                                    onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
                                    className="pl-6 h-9 bg-white border-gray-200 rounded-full text-sm"
                                />
                            </div>
                            <span className="text-sm text-gray-500 font-medium">To</span>
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                                <Input
                                    type="number"
                                    value={priceRange[1]}
                                    onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
                                    className="pl-6 h-9 bg-white border-gray-200 rounded-full text-sm"
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Size (Pot Size) */}
                <AccordionItem value="size" className="border-b-gray-100">
                    <AccordionTrigger className="hover:no-underline text-[#003d29] font-bold">Pot Size</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {['4"', '6"', '8"', '10"', '12"', '14"+'].map(size => {
                                const active = isActive("size", size);
                                return (
                                    <button
                                        key={size}
                                        onClick={() => toggleFilter("size", size)}
                                        className={cn(
                                            "w-10 h-10 rounded-full text-xs font-semibold flex items-center justify-center border transition-colors",
                                            active
                                                ? "bg-[#003d29] text-white border-[#003d29]"
                                                : "bg-gray-100 text-gray-600 border-transparent hover:border-[#003d29]"
                                        )}
                                    >
                                        {size}
                                    </button>
                                );
                            })}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Colors */}
                <AccordionItem value="colors" className="border-b-gray-100">
                    <AccordionTrigger className="hover:no-underline text-[#003d29] font-bold">Colors</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-wrap gap-3 pt-2">
                            {[
                                { name: "Green", code: "#4ade80" },
                                { name: "White", code: "#ffffff" },
                                { name: "Terracotta", code: "#c2410c" },
                                { name: "Black", code: "#000000" },
                                { name: "Yellow", code: "#facc15" },
                                { name: "Pink", code: "#f472b6" },
                            ].map((color) => {
                                const active = isActive("color", color.name);
                                return (
                                    <div
                                        key={color.name}
                                        className="flex flex-col items-center gap-1 cursor-pointer group"
                                        onClick={() => toggleFilter("color", color.name)}
                                    >
                                        <div
                                            className={cn(
                                                "size-8 rounded-full border border-gray-200 shadow-sm transition-all",
                                                active ? "ring-2 ring-offset-2 ring-[#003d29]" : "group-hover:ring-2 group-hover:ring-offset-2 group-hover:ring-[#003d29]"
                                            )}
                                            style={{ backgroundColor: color.code }}
                                        />
                                        <span className={cn(
                                            "text-[10px]",
                                            active ? "text-[#003d29] font-bold" : "text-gray-500 group-hover:text-[#003d29]"
                                        )}>{color.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Availability */}
                <AccordionItem value="availability" className="border-none">
                    <AccordionTrigger className="hover:no-underline text-[#003d29] font-bold">Availability</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center space-x-3">
                                <Checkbox id="in-stock" className="rounded-[4px] border-gray-300 data-[state=checked]:bg-[#003d29] data-[state=checked]:border-[#003d29]" defaultChecked />
                                <label htmlFor="in-stock" className="text-sm font-medium text-gray-600">In Stock (120)</label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Checkbox id="out-of-stock" className="rounded-[4px] border-gray-300 data-[state=checked]:bg-[#003d29] data-[state=checked]:border-[#003d29]" />
                                <label htmlFor="out-of-stock" className="text-sm font-medium text-gray-600">Out of Stock (14)</label>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>

            <Separator className="my-6" />

            {/* Static Benefits */}
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <DeliveryTruck01Icon className="size-6 text-[#003d29] shrink-0" />
                    <div>
                        <h4 className="font-bold text-[#003d29] text-sm">Free Shipping</h4>
                        <p className="text-xs text-gray-500">On all orders over $100</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <HeadphonesIcon className="size-6 text-[#003d29] shrink-0" />
                    <div>
                        <h4 className="font-bold text-[#003d29] text-sm">Plant Support</h4>
                        <p className="text-xs text-gray-500">Expert advice 24/7</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <RefreshIcon className="size-6 text-[#003d29] shrink-0" />
                    <div>
                        <h4 className="font-bold text-[#003d29] text-sm">Healthy Plant Guarantee</h4>
                        <p className="text-xs text-gray-500">30-day happiness warranty</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
