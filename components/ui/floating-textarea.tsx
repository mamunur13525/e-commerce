"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FloatingTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
    ({ className, label, id, ...props }, ref) => {
        // Generate a random ID if none provided to link label and textarea
        const generatedId = React.useId();
        const inputId = id || generatedId;

        return (
            <div className="relative">
                <textarea
                    id={inputId}
                    className={cn(
                        "peer block w-full rounded-xl border border-gray-200 bg-transparent px-4 pb-2.5 pt-6 text-sm text-gray-900 focus:border-[#003d29] focus:outline-none focus:ring-0 min-h-[120px] resize-y",
                        className
                    )}
                    placeholder=" "
                    ref={ref}
                    {...props}
                />
                <label
                    htmlFor={inputId}
                    className={cn(
                        "absolute top-4 z-10 origin-left -translate-y-3 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#003d29] left-4"
                    )}
                >
                    {label}
                </label>
            </div>
        );
    }
);
FloatingTextarea.displayName = "FloatingTextarea";

export { FloatingTextarea };
