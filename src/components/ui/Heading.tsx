import { FC, ReactNode, ElementType } from "react"
import clsx from "clsx"

type HeadingProps = {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

const Heading: FC<HeadingProps> = ({ children, level = 1, className }) => {
  const Tag: ElementType = `h${level}`

  return (
    <Tag
      className={clsx(
        "font-semibold text-gray-900 my-5",
        {
          "text-4xl": level === 1,
          "text-3xl": level === 2,
          "text-2xl": level === 3,
          "text-xl": level === 4,
          "text-lg": level === 5,
          "text-base": level === 6,
        },
        className
      )}
    >
      {children}
    </Tag>
  )
}

export default Heading
