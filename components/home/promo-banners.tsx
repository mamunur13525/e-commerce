import {
    Sun01Icon,
    SparklesIcon,
    Award01Icon,
    Megaphone01Icon
} from "hugeicons-react";
import type { Offer } from "@/lib/types/metadata";
import Image from "next/image";

const DEFAULT_ICONS = [Sun01Icon, SparklesIcon, Award01Icon, Megaphone01Icon];

interface PromoBannersProps {
    offers?: Offer[];
}

export function PromoBanners({ offers }: PromoBannersProps) {
    const displayOffers = offers && offers.length > 0 ? offers : [];
    return (
        <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {displayOffers.map((item, index) => {
                    const Icon = DEFAULT_ICONS[index] || Sun01Icon;
                    return (
                        <div
                            key={item._id}
                            className="relative flex flex-col overflow-hidden rounded-2xl transition-transform hover:scale-[1.02] "
                            style={{ backgroundColor: item.secondary_color }}
                        >
                            {/* Top Section */}
                            <div className="px-6 py-8 relative z-10">
                                <div className="absolute right-4 top-4">
                                    <Icon className="size-12 opacity-30" style={{ color: item.primary_color }} />
                                </div>

                                <h3 className="text-lg font-bold text-gray-900">{item.sub_title}</h3>
                                <p className="text-4xl font-black mb-3" style={{ color: item.primary_color }}>
                                    {item.title}
                                </p>
                                <p className="text-sm font-medium text-gray-600 leading-relaxed pr-16">
                                    {item.description}
                                </p>
                            </div>

                            {/* Bottom Section (Dark Wave/Curve) */}
                            <div className="mt-auto relative h-80 w-full rounded-t-4xl" style={{ backgroundColor: item.primary_color }}>
                                {/* Curved Divider */}
                                <div className="relative h-full w-full flex items-center justify-center p-4">
                                    {/* Product Image Placeholder */}
                                    <div className="relative size-52 hover:scale-110 transition-transform duration-300 grid place-items-center">
                                        <Image src={item.product_image} width={200} height={200} alt={item.title} className="h-full w-fit" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
