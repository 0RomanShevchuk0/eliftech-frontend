import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { QUIZ_BUILDER_DND_KEYS } from "@/constants/quiz-builder-dnd"
import { useDnDSort } from "@/hooks/useDnDSort"
import { IQuizFormState } from "@/types/quiz/quiz.types"
import { FC } from "react"
import { UseFieldArrayReturn, UseFormRegister } from "react-hook-form"

interface IProps {
  register: UseFormRegister<IQuizFormState>
  optionsFieldArray: UseFieldArrayReturn<IQuizFormState, `questions.${number}.options`, "id">
  questionIndex: number
  optionIndex: number
}

const QuestionOptionItem: FC<IProps> = ({
  register,
  questionIndex,
  optionIndex,
  optionsFieldArray,
}) => {
  const { remove: removeOption, fields, swap } = optionsFieldArray

  const { dndRef } = useDnDSort({
    fields,
    swap,
    index: optionIndex,
    dndKey: QUIZ_BUILDER_DND_KEYS.OPTION,
    hoverItemKey: "option",
  })

  return (
    <div ref={dndRef} className="flex items-center gap-4 w-full">
      <span className="font-semibold">{optionIndex + 1}.</span>
      <div className="flex gap-2 items-center w-2/3">
        <Input {...register(`questions.${questionIndex}.options.${optionIndex}.text`)} />
        <Button variant="outline" type="button" onClick={() => removeOption(optionIndex)}>
          Remove
        </Button>
      </div>
    </div>
  )
}

export default QuestionOptionItem
