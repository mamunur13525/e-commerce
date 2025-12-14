"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FloatingInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    startIcon?: React.ReactNode;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
    ({ className, label, startIcon, id, ...props }, ref) => {
        // Generate a random ID if none provided to link label and input
        const generatedId = React.useId();
        const inputId = id || generatedId;

        return (
            <div className="relative">
                <input
                    type={props.type || "text"}
                    id={inputId}
                    className={cn(
                        "peer block w-full rounded-xl border border-gray-200 bg-transparent px-4 pb-2.5 pt-6 text-sm text-gray-900 focus:border-[#003d29] focus:outline-none focus:ring-0",
                        startIcon && "pl-11", // Add padding if icon exists
                        className
                    )}
                    placeholder=" "
                    ref={ref}
                    {...props}
                />
                <label
                    htmlFor={inputId}
                    className={cn(
                        "absolute top-4 z-10 origin-left -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#003d29]",
                        startIcon ? "left-11" : "left-4"
                    )}
                >
                    {label}
                </label>
                {startIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#003d29]">
                        {startIcon}
                    </div>
                )}
            </div>
        );
    }
);
FloatingInput.displayName = "FloatingInput";

export { FloatingInput };
