import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { IQuizFormState } from "@/types/quiz/quiz.types"
import { FC } from "react"
import { UseFieldArrayRemove, UseFormRegister } from "react-hook-form"

interface IProps {
  register: UseFormRegister<IQuizFormState>
  removeOption: UseFieldArrayRemove
  questionIndex: number
  optionIndex: number
}

const QuestionOptionItem: FC<IProps> = ({ register, questionIndex, optionIndex, removeOption }) => {
  return (
    <div className="flex items-center gap-4 w-full">
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
