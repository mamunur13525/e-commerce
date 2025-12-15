"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Alert02Icon,
  MultiplicationSignCircleIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      richColors
      position="bottom-right"
      duration={4000}
      className="toaster group fixed z-50 right-6 bottom-6 space-y-3 pointer-events-auto"
      icons={{
        success: (
          <span className="flex items-center justify-center w-10 h-10 rounded-full  text-emerald-800 ring-1 ring-white/20">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="w-5 h-5" />
          </span>
        ),
        info: (
          <span className="flex items-center justify-center w-10 h-10 rounded-full  text-blue-500 ring-1 ring-white/10">
            <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="w-5 h-5" />
          </span>
        ),
        warning: (
          <span className="flex items-center justify-center w-10 h-10 rounded-full text-[#FEF3C7] ring-1 ring-white/10">
            <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="w-5 h-5" />
          </span>
        ),
        error: (
          <span className="flex items-center justify-center w-10 h-10 rounded-full  text-red-500 ring-1 ring-white/10">
            <HugeiconsIcon icon={MultiplicationSignCircleIcon} strokeWidth={2} className="w-5 h-5" />
          </span>
        ),
        loading: (
          <span className="flex items-center justify-center w-10 h-10 rounded-full text-black ring-1 ring-white/10 animate-pulse">
            <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="w-5 h-5 animate-spin" />
          </span>
        ),
      }}
      style={{
        "--normal-bg": "transparent",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "transparent",
        "--border-radius": "12px",
        "--success-bg": "#ECFDF5",
        "--success-border": "#D1FAE5",
        "--success-text": "#065F46",
        "--info-bg": "#EFF6FF",
        "--info-border": "#DBEAFE",
        "--info-text": "#0F172A",
        "--warning-bg": "#FFFBEB",
        "--warning-border": "#FEF3C7",
        "--warning-text": "#92400E",
        "--error-bg": "#FEF2F2",
        "--error-border": "#FEE2E2",
        "--error-text": "#7F1D1D",
      } as React.CSSProperties}
      toastOptions={{
        classNames: {
          toast:
            "cn-toast flex items-start gap-3 p-3 md:p-4 rounded-2xl shadow-2xl backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border border-white/10 dark:border-white/6 max-w-md",
          title: "text-sm font-semibold text-slate-900 dark:text-slate-100 pl-4",
          description: "text-sm text-slate-700 dark:text-slate-300 pl-4",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
