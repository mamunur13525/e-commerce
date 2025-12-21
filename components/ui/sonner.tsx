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
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white flex-shrink-0">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="w-4 h-4" />
          </span>
        ),
        info: (
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white flex-shrink-0">
            <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="w-4 h-4" />
          </span>
        ),
        warning: (
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white flex-shrink-0">
            <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="w-4 h-4" />
          </span>
        ),
        error: (
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white flex-shrink-0">
            <HugeiconsIcon icon={MultiplicationSignCircleIcon} strokeWidth={2} className="w-4 h-4" />
          </span>
        ),
        loading: (
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-500 text-white flex-shrink-0">
            <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="w-4 h-4 animate-spin" />
          </span>
        ),
      }}
      style={{
        "--normal-bg": "transparent",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "transparent",
        "--border-radius": "8px",
        "--success-bg": "#D1FAE5",
        "--success-border": "#D1FAE5",
        "--success-text": "#065F46",
        "--info-bg": "#DBEAFE",
        "--info-border": "#DBEAFE",
        "--info-text": "#1E40AF",
        "--warning-bg": "#FEF3C7",
        "--warning-border": "#FEF3C7",
        "--warning-text": "#92400E",
        "--error-bg": "#FEE2E2",
        "--error-border": "#FEE2E2",
        "--error-text": "#991B1B",
      } as React.CSSProperties}
      toastOptions={{
        classNames: {
          toast:
            "cn-toast flex items-center gap-3 p-4 rounded-lg shadow-md border max-w-md",
          title: "text-sm font-semibold pl-2",
          description: "text-sm",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
