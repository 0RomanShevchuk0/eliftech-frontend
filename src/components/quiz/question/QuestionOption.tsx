import { FC } from "react"
import { UseFieldArrayReturn, UseFormRegister } from "react-hook-form"
import { CreateQuizType } from "../../../types/quiz/quiz.types"

interface IProps {
  register: UseFormRegister<CreateQuizType>
  index: number
  fieldsArray: UseFieldArrayReturn<CreateQuizType, `questions.${number}.options`, "id">
}

const QuestionOption: FC<IProps> = ({ register, index, fieldsArray }) => {
  const { remove } = fieldsArray
  return (
    <div className="flex gap-2 items-center">
      {/* <input {...register(`questions.${index}.options.${optionIndex}.text`)} />
      <button type="button" onClick={() => remove(optionIndex)}>
        ❌
      </button> */}
    </div>
  )
}

export default QuestionOption
