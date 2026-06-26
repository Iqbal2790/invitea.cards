import * as React from "react"
import { cn } from "@/lib/utils"

const badgeVariants = {
  variant: {
    default:
      "border-transparent bg-brand text-white hover:bg-brand/80 shadow-sm",
    secondary:
      "border-transparent bg-brand-light text-brand hover:bg-brand-light/80",
    destructive:
      "border-transparent bg-red-400 text-white hover:bg-red-500 shadow-sm",
    outline: "text-text-main border-border-subtle",
  },
}

function Badge({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl border px-3 py-1 text-[10px] uppercase tracking-wider font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
        badgeVariants.variant[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
