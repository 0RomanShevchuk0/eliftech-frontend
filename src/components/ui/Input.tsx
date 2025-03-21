import clsx from "clsx"
import { FC, InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={clsx(
        "border-1 border-gray-800 px-2 py-1 focus:border-black outline-none w-full",
        !className?.includes("w-") && "w-full",
        className
      )}
    />
  )
}

export default Input
