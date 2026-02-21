"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  Alert02Icon,
  MultiplicationSignCircleIcon,
} from "@hugeicons/core-free-icons";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  // Base style for the icons to ensure they look uniform
  const iconBase =
    "flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0";

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      richColors
      position="bottom-right"
      className="toaster group fixed z-50 right-6 bottom-6 space-y-3 pointer-events-auto font-sans"
      // Custom Icons with specific colors from the image
      icons={{
        success: (
          <span className={`${iconBase} bg-emerald-500/10 text-emerald-400`}>
            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-5 h-5" />
          </span>
        ),
        warning: (
          <span className={`${iconBase} bg-yellow-500/10 text-yellow-400`}>
            <HugeiconsIcon icon={Alert02Icon} className="w-5 h-5" />
          </span>
        ),
        error: (
          <span className={`${iconBase} bg-rose-500/10 text-rose-400`}>
            <HugeiconsIcon
              icon={MultiplicationSignCircleIcon}
              className="w-5 h-5"
            />
          </span>
        ),
      }}
      toastOptions={{
        unstyled: true, // Allows us to fully control the styling
        classNames: {
          toast: `
            flex items-start gap-4  w-full md:w-[356px]
            rounded-2xl border border-white/5 shadow-xl
            transition-all duration-300
            
            /* Base Background */
            bg-neutral-950 text-white
            
            /* Gradient Overlays based on type */
            data-[type=success]:bg-gradient-to-r 
            data-[type=success]:from-emerald-900/30 
            data-[type=success]:to-neutral-950

            data-[type=warning]:bg-gradient-to-r 
            data-[type=warning]:from-yellow-900/30 
            data-[type=warning]:to-neutral-950

            data-[type=error]:bg-gradient-to-r 
            data-[type=error]:from-rose-900/30 
            data-[type=error]:to-neutral-950
          `,
          title: " text-[15px] font-semibold leading-snug tracking-tight",
          description: "text-[13px] text-white/60 leading-5 mt-1",
          actionButton:
            "bg-white text-black text-xs font-medium px-3 py-1.5 rounded-md",
          cancelButton:
            "bg-white/10 text-white text-xs font-medium px-3 py-1.5 rounded-md",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
