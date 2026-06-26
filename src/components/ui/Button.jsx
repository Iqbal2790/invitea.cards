import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = {
  variant: {
    default: "bg-brand text-white hover:bg-brand/90 shadow-[0_4px_14px_0_rgb(183,110,121,0.39)] transition-all",
    destructive: "bg-red-400 text-white hover:bg-red-500 shadow-sm",
    outline: "border border-border-subtle bg-transparent text-brand hover:bg-brand-light shadow-sm",
    secondary: "bg-accent-green text-text-main hover:bg-accent-green/80",
    ghost: "text-text-main hover:bg-bg-base",
    link: "text-brand underline-offset-4 hover:underline",
  },
  size: {
    default: "h-11 px-6 py-2",
    sm: "h-9 rounded-xl px-4 text-xs",
    lg: "h-14 rounded-2xl px-10 text-base",
    icon: "h-11 w-11",
  },
}

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium tracking-wide ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
