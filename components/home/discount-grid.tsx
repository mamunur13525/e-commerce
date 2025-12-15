import {
    Sun01Icon,
    SparklesIcon,
    Award01Icon,
    Megaphone01Icon
} from "hugeicons-react";
import type { Offer } from "@/lib/types/metadata";

const DEFAULT_ICONS = [Sun01Icon, SparklesIcon, Award01Icon, Megaphone01Icon];

interface DiscountGridProps {
    offers?: Offer[];
}

export function DiscountGrid({ offers }: DiscountGridProps) {
    const displayOffers = offers && offers.length > 0 ? offers : [];
    return (
        <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {displayOffers.map((item, index) => {
                    const Icon = DEFAULT_ICONS[index] || Sun01Icon;
                    return (
                        <div
                            key={item._id}
                            className="relative flex flex-col overflow-hidden rounded-2xl transition-transform hover:scale-[1.02] "
                            style={{ backgroundColor: item.secondary_color }}
                        >
                            {/* Top Section */}
                            <div className="p-6 pb-0 relative z-10">
                                <div className="absolute right-4 top-4">
                                    <Icon className="size-8 opacity-60" style={{ color: item.primary_color }} />
                                </div>

                                <h3 className="text-lg font-bold text-gray-900">{item.sub_title}</h3>
                                <p className="text-4xl font-black mb-3" style={{ color: item.primary_color }}>
                                    {item.title}
                                </p>
                                <p className="text-sm font-medium text-gray-600 leading-snug max-w-37.5">
                                    {item.description}
                                </p>
                            </div>

                            {/* Bottom Section (Dark Wave/Curve) */}
                            <div className="mt-auto relative h-40 w-full" style={{ backgroundColor: item.primary_color }}>
                                <div className="relative h-full w-full flex items-center justify-center pt-4">
                                    {/* Product Image Placeholder */}
                                    <div className="relative size-32 hover:scale-110 transition-transform duration-300">
                                        <div className="w-full h-full bg-white/20 rounded-lg shadow-lg flex items-center justify-center backdrop-blur-sm border border-white/10">
                                            <span className="text-white/80 text-xs font-bold px-2 text-center">Product Image</span>
                                        </div>
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
