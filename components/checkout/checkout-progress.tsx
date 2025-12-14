"use client";

import { cn } from "@/lib/utils";
import { Tick02Icon } from "hugeicons-react";

interface CheckoutProgressProps {
    currentStep: 1 | 2 | 3;
}

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
    const steps = [
        { id: 1, label: "Cart" },
        { id: 2, label: "Checkout" },
        { id: 3, label: "Complete" },
    ];

    return (
        <div className="w-full max-w-2xl mx-auto mb-12 px-4">
            <div className="relative flex items-center justify-between">
                {/* Background Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full" />

                {/* Active Progress Line */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-[#003d29] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step) => {
                    const isCompleted = currentStep > step.id;
                    const isActive = currentStep === step.id;
                    const isPending = currentStep < step.id;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-3 relative z-10 group">
                            <div
                                className={cn(
                                    "size-10 md:size-12 rounded-full flex items-center justify-center font-bold text-base transition-all duration-500 border-4 bg-white",
                                    isActive
                                        ? "bg-[#003d29] border-[#aedf4d] text-white shadow-lg shadow-green-900/10 scale-110"
                                        : isCompleted
                                            ? "bg-[#003d29] border-[#003d29] text-white"
                                            : "border-gray-100 text-gray-300"
                                )}
                            >
                                {isCompleted ? (
                                    <Tick02Icon className="size-5 md:size-6" />
                                ) : (
                                    <span>{step.id}</span>
                                )}
                            </div>
                            <span
                                className={cn(
                                    "absolute -bottom-8 text-xs md:text-sm font-bold tracking-wide transition-colors duration-300 whitespace-nowrap",
                                    isActive ? "text-[#003d29]" : isCompleted ? "text-[#003d29]" : "text-gray-300"
                                )}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
