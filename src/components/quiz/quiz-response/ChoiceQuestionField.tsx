import { QuestionType } from "@/types/quiz/question/enums"
import { IQuestion } from "@/types/quiz/question/question.types"
import { FC } from "react"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"

interface IProps {
  question: IQuestion
  register: UseFormRegisterReturn
  index: number
  error?: FieldError
}

const questionInputType: Record<QuestionType, string> = {
  TEXT: "text",
  SINGLE_CHOICE: "radio",
  MULTIPLE_CHOICES: "checkbox",
}

const ChoiceQuestionField: FC<IProps> = ({ question, error, register, index }) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-gray-700 mb-1 text-md">{`${index + 1}. ${question.title}`}</p>
      {question.options.map((option) => (
        <label key={option.id} className="flex gap-3">
          <input type={questionInputType[question.type]} value={[option.id]} {...register} />
          {option.text}
        </label>
      ))}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  )
}

export default ChoiceQuestionField
