import Image from "next/image";
import { FlashIcon } from "hugeicons-react";
import { cn } from "@/lib/utils";

interface StoreCardProps {
    name: string;
    image: string;
    deliveryTime: string;
    colorClass: string; // Tailiwind class for background color e.g. "bg-orange-500"
    description: string;
}

export function StoreCard({
    name,
    image,
    deliveryTime,
    colorClass,
    description,
}: StoreCardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 h-full">
            {/* Top half with color - removed pattern for cleaner look */}
            <div className={cn("relative h-28 w-full overflow-hidden transition-colors duration-300", colorClass)}>
                {/* Subtle curve at bottom of header */}
                <div className="absolute -bottom-6 left-0 right-0 h-10 bg-white rounded-t-[50%] scale-x-110"></div>

                {/* Organic overlay opacity */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* Logo container - positioned to overlap organically */}
            <div className="absolute left-1/2 -translate-x-1/2 top-12 h-20 w-20">
                <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-white bg-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <div className="flex h-full w-full items-center justify-center bg-gray-50">
                        {/* If actual image url is passed we use it, otherwise a placeholder */}
                        {image ? (
                            <Image
                                src={image}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <span className="text-2xl font-black text-gray-300 select-none">{name[0]}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center px-6 pb-8 pt-12 text-center flex-1">
                <h3 className="mb-2 text-xl font-bold text-[#003d29] tracking-tight group-hover:text-emerald-700 transition-colors">
                    {name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 max-w-[200px]">
                    {description}
                </p>
                <div className="mt-auto inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
                    <FlashIcon className="size-3.5 fill-orange-500 text-orange-500" />
                    <span>{deliveryTime}</span>
                </div>
            </div>
        </div>
    );
}
