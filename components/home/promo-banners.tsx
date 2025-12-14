import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock01Icon, DeliveryBox01Icon } from "hugeicons-react";

export function PromoBanners() {
    return (
        <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Banner 1: Free Delivery (Blue) */}
                <div className="relative overflow-hidden rounded-2xl bg-[#003d6d] p-8 text-white shadow-sm md:p-10">
                    {/* Background pattern decoration */}
                    <div className="absolute right-0 top-0 h-full w-2/3 opacity-10">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                            <path fill="currentColor" d="M45.7,-70.5C58.9,-62.5,69.3,-49.4,75.9,-34.7C82.5,-20,85.4,-3.7,81.6,10.6C77.9,24.9,67.5,37.2,56.2,47.3C44.9,57.4,32.7,65.2,19.4,69.1C6.1,73,-8.3,73,-21.8,68.4C-35.3,63.8,-47.9,54.6,-58.1,43.2C-68.3,31.8,-76.1,18.2,-78.9,3.3C-81.7,-11.6,-79.5,-27.8,-70.7,-40.7C-61.9,-53.6,-46.5,-63.2,-31.2,-69.6C-15.9,-76,-0.7,-79.2,14.2,-78.1L45.7,-70.5Z" transform="translate(100 100)" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-sm">
                        <div className="mb-4 inline-flex items-center rounded-md bg-[#4fc3f7] px-3 py-1 text-xs font-bold text-[#003d6d]">
                            <DeliveryBox01Icon className="mr-2 size-4" />
                            Free delivery
                        </div>
                        <h3 className="mb-2 text-3xl font-bold leading-tight md:text-4xl">
                            Get up to 50% off Delivery by 12:15pm
                        </h3>
                        <p className="mb-6 text-lg font-medium text-blue-100">Fast and free</p>

                        <Button variant="secondary" className="bg-white text-[#003d6d] hover:bg-gray-100">
                            Order Now
                        </Button>
                    </div>

                    {/* 3D Gift Box Image Placeholder */}
                    <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
                        <div className="size-32 md:size-40 bg-green-500 rounded-xl shadow-2xl flex items-center justify-center transform rotate-12">
                            <span className="text-4xl">🎁</span>
                        </div>
                    </div>
                </div>

                {/* Banner 2: Membership (Orange/Brown) */}
                <div className="relative overflow-hidden rounded-2xl bg-[#a04020] p-8 text-white shadow-sm md:p-10">
                    {/* Background pattern decoration */}
                    <div className="absolute right-0 top-0 h-full w-2/3 opacity-10">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                            <path fill="currentColor" d="M38.1,-62.7C49.9,-54.2,60.5,-44.6,68.4,-33.2C76.3,-21.8,81.5,-8.6,79.8,3.9C78.1,16.4,69.5,28.2,60.1,38.8C50.7,49.4,40.5,58.8,28.8,65.3C17.1,71.8,3.9,75.4,-8.4,73.5C-20.7,71.6,-32.1,64.2,-42.9,56.1C-53.7,48,-63.9,39.2,-70.6,28.1C-77.3,17,-80.5,3.6,-77.2,-8.1C-73.9,-19.8,-64.1,-29.8,-53.8,-38.8C-43.5,-47.8,-32.7,-55.8,-21.4,-60.8C-10.1,-65.8,1.7,-67.8,13.2,-66.1L38.1,-62.7Z" transform="translate(100 100)" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-sm">
                        <div className="mb-4 inline-flex items-center rounded-md bg-[#ffb74d] px-3 py-1 text-xs font-bold text-[#a04020]">
                            <span className="mr-2">💳</span>
                            Membership Card
                        </div>
                        <h3 className="mb-2 text-3xl font-bold leading-tight md:text-4xl">
                            You can enjoy a 5% discount using our health card
                        </h3>
                        <p className="mb-6 h-6"></p> {/* Spacer */}

                        <Button variant="secondary" className="bg-[#ffb74d] text-[#a04020] hover:bg-[#ffa726]">
                            Apply Now
                        </Button>
                    </div>

                    {/* 3D Clock Image Placeholder */}
                    <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
                        <div className="size-32 md:size-40 bg-yellow-300 rounded-full shadow-2xl flex items-center justify-center border-8 border-yellow-500">
                            <Clock01Icon className="size-16 text-yellow-800" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
