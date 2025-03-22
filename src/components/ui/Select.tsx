import clsx from "clsx"
import { FC, InputHTMLAttributes } from "react"

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {}

const Select: FC<SelectProps> = ({ className, children, ...props }) => {
  return (
    <select
      {...props}
      className={clsx(
        "border-1 border-gray-800 px-2 py-1 focus:border-black outline-none w-full",
        !className?.includes("w-") && "w-full",
        className
      )}
    >
      {children}
    </select>
  )
}

export default Select
