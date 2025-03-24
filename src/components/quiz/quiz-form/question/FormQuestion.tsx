import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { QuestionTypesEnum } from "@/types/quiz/question/enums"
import { IQuizFormState } from "@/types/quiz/quiz.types"
import { FC, useRef } from "react"
import { Control, UseFieldArrayReturn, UseFormRegister, useWatch } from "react-hook-form"
import QuestionOptions from "./QuestionOptions"
import { useDrag, useDrop } from "react-dnd"
import type { XYCoord } from "dnd-core"
import { QUIZ_BUILDER_DND_KEYS } from "@/constants/quiz-builder-dnd"
import { IQuestion } from "@/types/quiz/question/question.types"

interface IProps {
  register: UseFormRegister<IQuizFormState>
  control: Control<IQuizFormState>
  index: number
  questionsFieldArray: UseFieldArrayReturn<IQuizFormState, "questions", "id">
}

const questionTypeOptions = [
  { value: QuestionTypesEnum.TEXT, label: "Text" },
  { value: QuestionTypesEnum.SINGLE_CHOICE, label: "Single choice" },
  { value: QuestionTypesEnum.MULTIPLE_CHOICES, label: "Multiple choices" },
]

const FormQuestion: FC<IProps> = ({ register, control, index, questionsFieldArray }) => {
  const watchOutput = useWatch({ name: "questions", control })

  const { remove, fields, swap } = questionsFieldArray
  const question = fields[index]

  const dndRef = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop<{ question: IQuestion }>({
    accept: QUIZ_BUILDER_DND_KEYS.QUESTION,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: { question: IQuestion }, monitor) {
      if (!dndRef.current) return

      const dragIndex = fields.findIndex((q) => q.id === item.question.id)

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
        item.question.order = hoverIndex
      }
    },
  })

  const [, drag] = useDrag({
    type: QUIZ_BUILDER_DND_KEYS.QUESTION,
    item: { question },
  })

  drag(drop(dndRef))

  return (
    <div ref={dndRef}>
      <div key={question.id} className="flex items-end gap-6 w-full">
        <span className="font-semibold">{index + 1}.</span>
        <div className="flex flex-col gap-3 h-full w-full">
          <div className="flex gap-3 items-end w-full">
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Question</label>
              <Input {...register(`questions.${index}.title` as const)} />
            </div>

            <div className="flex flex-col items-start gap-1 w-1/4">
              <label>Type</label>
              <Select {...register(`questions.${index}.type` as const)}>
                {questionTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>

            <Button type="button" variant="outline" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        </div>
      </div>

      {watchOutput[index]?.type !== "TEXT" && (
        <QuestionOptions register={register} control={control} index={index} />
      )}
    </div>
  )
}

export default FormQuestion
