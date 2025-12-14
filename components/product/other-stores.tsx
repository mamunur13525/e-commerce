"use client";

import { cn } from "@/lib/utils";
import { ArrowRight01Icon, FlashIcon } from "hugeicons-react";
import Link from "next/link";

const STORES = [
    {
        name: "M&M Food Market",
        delivery: "Delivery in 12 minute",
        price: "20.42$",
        color: "bg-orange-50",
        logo: "MM",
        logoColor: "text-red-600",
        logoBg: "bg-white",
        isActive: true, // green border style from image
    },
    {
        name: "T&T Food Market",
        delivery: "Delivery in 13 minute",
        price: "19.50$",
        color: "bg-gray-50",
        logo: "T&T",
        logoColor: "text-white",
        logoBg: "bg-[#092929]",
    },
    {
        name: "T&T Food Market",
        delivery: "Delivery in 13 minute",
        price: "19.50$",
        color: "bg-gray-50",
        logo: "T&T",
        logoColor: "text-white",
        logoBg: "bg-[#092929]",
    },
    {
        name: "T&T Food Market",
        delivery: "Delivery in 13 minute",
        price: "19.50$",
        color: "bg-gray-50",
        logo: "T&T",
        logoColor: "text-white",
        logoBg: "bg-[#092929]",
        tag: "Lower price",
    },
    {
        name: "Loblaws",
        delivery: "Delivery in 15 minute",
        price: "23.00$",
        color: "bg-gray-50",
        logo: "L",
        logoColor: "text-red-500",
        logoBg: "bg-white",
    },
    {
        name: "Loblaws",
        delivery: "Delivery in 15 minute",
        price: "23.00$",
        color: "bg-gray-50",
        logo: "L",
        logoColor: "text-red-500",
        logoBg: "bg-white",
    },
];

export function OtherStores() {
    return (
        <div className="py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-[#092929]">Others store</h2>
                <Link
                    href="/stores"
                    className="flex items-center gap-2 text-red-700 font-semibold hover:gap-3 transition-all"
                >
                    Visit stores <ArrowRight01Icon className="size-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STORES.map((store, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "flex items-center justify-between p-4 rounded-xl relative overflow-hidden",
                            store.color,
                            store.isActive && "border border-green-200 ring-1 ring-green-100 bg-[#f3fded]"
                        )}
                    >
                        {/* Tag */}
                        {store.tag && (
                            <span className="absolute top-0 right-0 bg-[#6d28d9] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg">
                                {store.tag}
                            </span>
                        )}

                        <div className="flex items-center gap-4">
                            <div className={cn("size-12 rounded-full flex items-center justify-center font-bold shadow-sm", store.logoBg, store.logoColor)}>
                                {store.logo}
                            </div>
                            <div>
                                <h3 className="font-bold text-[#092929]">{store.name}</h3>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                    <FlashIcon className="size-3 text-yellow-500 fill-yellow-500" />
                                    {store.delivery}
                                </div>
                            </div>
                        </div>

                        <div className="text-lg font-bold text-[#092929] pr-2">
                            {store.price}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
