import { FC, ButtonHTMLAttributes } from "react"
import clsx from "clsx"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "outline"
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-gray-500 hover:bg-gray-600 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  success: "bg-green-500 hover:bg-green-600 text-white",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
  outline: "bg-transparent border border-transparent text-black hover:underline",
}

const disabledStyles = "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70 hover:bg-gray-300"

const Button: FC<ButtonProps> = ({ children, className, variant = "primary", ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded-md transition-colors cursor-pointer",
        variantStyles[variant],
        props.disabled && disabledStyles,
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
