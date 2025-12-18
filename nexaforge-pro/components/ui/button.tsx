import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'gradient'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-black text-white hover:bg-black/90",
      outline: "border border-black bg-transparent hover:bg-black hover:text-white",
      ghost: "hover:bg-black/10",
      gradient: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
