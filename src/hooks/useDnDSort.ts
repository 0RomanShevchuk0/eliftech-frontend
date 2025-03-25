import { useRef } from "react"
import { XYCoord, useDrag, useDrop } from "react-dnd"
import { UseFieldArraySwap } from "react-hook-form"

interface IProps<T> {
  fields: T[]
  swap: UseFieldArraySwap
  index: number
  hoverItemKey: string
  dndKey: string
}

export const useDnDSort = <FieldArrayItemType extends { id: string }>({
  fields,
  swap,
  index,
  hoverItemKey,
  dndKey,
}: IProps<FieldArrayItemType>) => {
  const dndRef = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop<{ hoverItemKey: FieldArrayItemType }>({
    accept: dndKey,
    collect: (monitor) => ({ handlerId: monitor.getHandlerId() }),
    hover: (item: { hoverItemKey: FieldArrayItemType }, monitor) => {
      if (!dndRef.current) return

			const fieldItem = item[hoverItemKey as keyof typeof item] as FieldArrayItemType
      const dragIndex = fields.findIndex((i) => i.id === fieldItem.id)
      const hoverIndex = index
      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = dndRef.current.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      const movingDown = dragIndex < hoverIndex && hoverClientY > hoverMiddleY
      const movingUp = dragIndex > hoverIndex && hoverClientY < hoverMiddleY

      if (movingDown || movingUp) {
        swap(dragIndex, hoverIndex)
      }
    },
  })

  const [, drag] = useDrag({
    type: dndKey,
    item: { [hoverItemKey]: fields[index] },
  })

  drag(drop(dndRef))
  return { dndRef }
}
