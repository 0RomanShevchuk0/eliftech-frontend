import clsx from "clsx"
import { FC, InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={clsx(
        "border-b border-gray-800 px-0 focus:border-black outline-none",
        !className?.includes("w-") && "w-full",
        className
      )}
    />
  )
}

export default Input
