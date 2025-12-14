"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const IMAGES = [
    "/placeholder-flour.png",
    "/placeholder-flour.png",
    "/placeholder-flour.png",
    "/placeholder-flour.png",
    "/placeholder-flour.png",
];

export function ProductGallery() {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full bg-[#f6f6f6] rounded-3xl overflow-hidden flex items-center justify-center p-8">
                <span className="absolute top-4 left-4 bg-[#092929] text-white text-xs font-medium px-3 py-1.5 rounded-full z-10">
                    Free Delivery
                </span>
                <div className="relative w-full h-full max-w-[300px] max-h-[400px]">
                    {/* Using a placeholder text/div until actual images are loaded for the demo if assets miss */}
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100 rounded-lg">
                        <Image
                            src={IMAGES[activeImage]}
                            alt="Product Image"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
                {IMAGES.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={cn(
                            "relative aspect-square bg-[#f6f6f6] rounded-xl overflow-hidden p-2 transition-all",
                            activeImage === idx
                                ? "ring-2 ring-[#003d29]"
                                : "hover:bg-gray-100"
                        )}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
