import Image from "next/image";
import {
    Sun01Icon,
    SparklesIcon,
    Award01Icon,
    Megaphone01Icon
} from "hugeicons-react";
import { cn } from "@/lib/utils";

const DISCOUNTS = [
    {
        title: "Save",
        value: "$29",
        description: "Enjoy Discount all types of Grocery & frozen item",
        bgColor: "bg-[#ffeef6]", // Pinkish
        darkColor: "bg-[#6d1338]",
        icon: Sun01Icon,
        image: "/placeholder-flour.png", // Replace with real image
        accentColor: "text-[#6d1338]",
    },
    {
        title: "Discount",
        value: "30%",
        description: "Enjoy Discount all types of Grocery & frozen item",
        bgColor: "bg-[#fff3e0]", // Orangish
        darkColor: "bg-[#9a3d13]",
        icon: SparklesIcon,
        image: "/placeholder-butter.png",
        accentColor: "text-[#9a3d13]",
    },
    {
        title: "Up to",
        value: "50%",
        description: "Enjoy Discount all types of Grocery & frozen item",
        bgColor: "bg-[#e3f2fd]", // Light Blue
        darkColor: "bg-[#0d47a1]",
        icon: Award01Icon,
        image: "/placeholder-skippy.png",
        accentColor: "text-[#0d47a1]",
    },
    {
        title: "Free",
        value: "SHIP",
        description: "Enjoy Discount all types of Grocery & frozen item",
        bgColor: "bg-[#f3e5f5]", // Light Purple
        darkColor: "bg-[#4a148c]",
        icon: Megaphone01Icon,
        image: "/placeholder-corn.png",
        accentColor: "text-[#4a148c]",
    },
];

export function DiscountGrid() {
    return (
        <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {DISCOUNTS.map((item, index) => (
                    <div
                        key={index}
                        className={cn(
                            "relative flex flex-col overflow-hidden rounded-2xl transition-transform hover:scale-[1.02]",
                            item.bgColor
                        )}
                    >
                        {/* Top Section */}
                        <div className="p-6 pb-0 relative z-10">
                            <div className="absolute right-4 top-4">
                                <item.icon className={cn("size-8 opacity-60", item.accentColor)} />
                            </div>

                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                            <p className={cn("text-4xl font-black mb-3", item.accentColor)}>
                                {item.value}
                            </p>
                            <p className="text-sm font-medium text-gray-600 leading-snug max-w-[150px]">
                                {item.description}
                            </p>
                        </div>

                        {/* Bottom Section (Dark Wave/Curve) */}
                        <div className={cn("mt-auto relative h-40 w-full", item.darkColor)}>
                            {/* Curve SVG */}
                            <svg
                                className="absolute -top-1 left-0 w-full text-current"
                                viewBox="0 0 1440 320"
                                preserveAspectRatio="none"
                                style={{ color: "var(--bg-color)" }} // We need to match the top color to create the curve effect potentially, or just use a simple curve shape 
                                height="40"
                            >
                                {/* Currently just a flat transition as per image it looks like a distinct block or a wave. 
                         Looking at the image (Save $29), it's a solid dark block at the bottom with a slight curve. 
                         Let's just use the dark block for now with a rounded top if possible, or just the block.
                         The image shows a "wave" top on the dark part.
                     */}
                                <path
                                    fill={item.bgColor.replace("bg-[", "").replace("]", "")} // This won't work easily with Tailwind classes.
                                    // Instead, let's just make the dark block have a convex curve at the top.
                                    d="M0,32L1440,0L1440,320L0,320Z" // Simple slope? No, let's try a wave
                                    fillOpacity="1"
                                />
                            </svg>

                            {/* Since matching the exact bg color via SVG fill is tricky with Tailwind classes without arbitrary values or vars,
                    I'll use a simpler approach: The dark container just exists. 
                    I'll add the image inside it.
                */}

                            <div className="absolute inset-x-0 -top-8 flex justify-center">
                                {/* Curve simulation could be done with a pseudo element or image, but for now simple block */}
                            </div>

                            <div className="relative h-full w-full flex items-center justify-center pt-4">
                                {/* Product Image Placeholder */}
                                <div className="relative size-32 hover:scale-110 transition-transform duration-300">
                                    {/* 
                            We don't have real images, so I'll create a mockup using a colored div or leave it empty. 
                            The user has uploaded images, but they are screenshots.
                        */}
                                    <div className="w-full h-full bg-white/20 rounded-lg shadow-lg flex items-center justify-center backdrop-blur-sm border border-white/10">
                                        <span className="text-white/80 text-xs font-bold px-2 text-center">Product Image</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
