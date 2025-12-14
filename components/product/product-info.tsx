"use client";

import { useMemo } from "react";
import { StarIcon, FavouriteIcon, ShoppingBag01Icon, TradeUpIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";

export function ProductInfo() {
    // Mock Countdown
    const countdown = useMemo(() => {
        return {
            days: "270",
            hours: "13",
            minutes: "10",
            seconds: "32",
        };
    }, []);

    return (
        <div className="flex flex-col gap-6">
            {/* Header / Countdown */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-orange-500 font-bold text-lg mb-2">
                    <div className="flex gap-1">
                        <span className="bg-orange-50 px-2 py-0.5 rounded text-orange-600">{countdown.days}</span> :
                        <span className="bg-orange-50 px-2 py-0.5 rounded text-orange-600">{countdown.hours}</span> :
                        <span className="bg-orange-50 px-2 py-0.5 rounded text-orange-600">{countdown.minutes}</span> :
                        <span className="bg-orange-50 px-2 py-0.5 rounded text-orange-600">{countdown.seconds}</span>
                    </div>
                </div>

                <div className="text-sm text-gray-500">Bevmo grocery</div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#092929]">
                    Bobs red mill whole wheat organic flour
                </h1>

                <div className="flex items-center gap-2 mt-2">
                    <StarIcon className="size-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-[#092929]">4.5 Rating</span>
                    <span className="text-gray-400 underline decoration-gray-300">(15 reviews)</span>
                </div>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-[#092929]">
                29.<span className="text-2xl text-gray-500 align-top">12$</span>
            </div>

            {/* Installments */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="bg-pink-100 px-3 py-1 rounded text-pink-600 font-bold text-sm">Klarna.</div>
                <div className="text-sm text-gray-600">
                    Split in to 3 interest-free <br />
                    <span className="font-bold text-gray-900">payments 110$</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 py-4 border-b border-gray-100">
                <div className="flex gap-4">
                    <Button className="flex-1 bg-[#f0f3f2] text-[#092929] hover:bg-[#e1e6e4] h-12 rounded-full font-bold">
                        <ShoppingBag01Icon className="mr-2 size-5" />
                        Add to bucket
                    </Button>
                    <Button className="flex-1 bg-[#d4e157] text-[#092929] hover:bg-[#c0ce4e] h-12 rounded-full font-bold">
                        Buy now
                    </Button>
                </div>

                <div className="flex items-center gap-6 text-sm font-semibold text-[#092929]">
                    <button className="flex items-center gap-2 hover:text-green-700">
                        <FavouriteIcon className="size-5" />
                        ADD TO WISHLIST
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-700">
                        <TradeUpIcon className="size-5" />
                        Compare with other vendor
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between py-2">
                <div className="flex gap-2">
                    <span className="size-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">🍃</span>
                    <span className="size-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">🌾</span>
                    <span className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">🥣</span>
                </div>
                <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                    🔥 100 sold in last 35 hour
                </div>
            </div>

            {/* Meta */}
            <div className="space-y-2 text-sm text-gray-500">
                <div>
                    <span className="font-bold text-[#092929]">SKU:</span> MB3442
                </div>
                <div>
                    <span className="font-bold text-[#092929]">Categories:</span>{' '}
                    <span className="underline decoration-gray-300">Fruits</span>,{' '}
                    <span className="underline decoration-gray-300">Hoodies</span>,{' '}
                    <span className="underline decoration-gray-300">Juice</span>,{' '}
                    <span className="underline decoration-gray-300">snacks</span>,{' '}
                    <span className="underline decoration-gray-300">Tshirts</span>
                </div>
                <p className="pt-2 text-gray-500 leading-relaxed">
                    Coconut Oil is a great-tasting, nutritious alternative to use when cooking or baking.
                    Coconut Oil is a naturally rich source of medium chain triglycerides.
                </p>
            </div>

            {/* Delivery & Returns placeholder from image */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="flex gap-3">
                    <div className="size-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">🚚</div>
                    <div>
                        <div className="font-bold text-[#092929] text-sm">Free Delivery</div>
                        <div className="text-xs text-gray-500">Apply To All Order Over $100</div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="size-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">🤝</div>
                    <div>
                        <div className="font-bold text-[#092929] text-sm">Great Daily Deal</div>
                        <div className="text-xs text-gray-500">We Providing Organic Products</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
