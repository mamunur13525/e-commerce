import Image from "next/image";
import { FlashIcon } from "hugeicons-react";
import { cn } from "@/lib/utils";

interface StoreCardProps {
    name: string;
    image: string;
    deliveryTime: string;
    colorClass: string; // Tailiwind class for background color e.g. "bg-orange-500"
}

export function StoreCard({
    name,
    image,
    deliveryTime,
    colorClass,
}: StoreCardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white transition-all  border border-gray-100">
            {/* Top half with color and pattern */}
            <div className={cn("relative h-24 w-full overflow-hidden", colorClass)}>
                <div className="absolute inset-0 opacity-10">
                    {/* Abstract pattern SVG */}
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="doodle" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M10 10c0-5 5-5 5 0s5 5 5 0" stroke="currentColor" fill="none" strokeWidth="2" />
                                <circle cx="30" cy="30" r="2" fill="currentColor" />
                                <path d="M0 40 L40 0" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#doodle)" />
                    </svg>
                </div>
            </div>

            {/* Logo container - positioned to overlap */}
            <div className="absolute left-6 top-14 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-white">
                <div className="relative h-full w-full flex items-center justify-center bg-gray-400">
                    {/* If actual image url is passed we use it, otherwise a placeholder */}
                    {image ? (
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <span className="text-xl font-bold text-gray-300">{name[0]}</span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col px-6 pb-6 pt-10">
                <h3 className="mb-2 text-xl font-bold text-[#092929]">{name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                    <FlashIcon className="mr-1.5 h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>{deliveryTime}</span>
                </div>
            </div>
        </div>
    );
}
