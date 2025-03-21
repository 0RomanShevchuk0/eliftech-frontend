import { FC } from "react"
import { UseFieldArrayReturn, UseFormRegister } from "react-hook-form"
import Button from "../../ui/Button"
import { QuestionType } from "../../../types/quiz/question/enums"
import { CreateQuizType } from "../../../types/quiz/quiz.types"

interface IProps {
  register: UseFormRegister<CreateQuizType>
  fieldsArray: UseFieldArrayReturn<CreateQuizType, "questions", "id">
}

const questionTypeOptions: { value: QuestionType; label: string }[] = [
  { value: "TEXT", label: "Text" },
  { value: "SINGLE_CHOICE", label: "Single choice -" },
  { value: "MULTIPLE_CHOICES", label: "Multiple choices" },
]
const inputClass = "border-1 border-gray-800 px-2 py-1 focus:border-black outline-none w-full"

const FormQuestions: FC<IProps> = ({ register, fieldsArray }) => {
  const { fields, remove } = fieldsArray

  const Questions = fields.map((field, index) => {
    const SelectOptionsElements = questionTypeOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))

    return (
      <div key={field.id} className="flex items-center gap-6 w-full">
        <div className="flex gap-3 items-end h-full w-full">
          <span className=" font-semibold">{field.order}.</span>
          <div className="flex flex-col items-start gap-1 w-full">
            <label>Question</label>
            <input
              key={`title:${field.id}`}
              {...register(`questions.${index}.title` as const)}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col items-start gap-1 w-1/4">
            <label>Type</label>
            <select
              key={`type:${field.id}`}
              {...register(`questions.${index}.type` as const)}
              className={inputClass}
            >
              {SelectOptionsElements}
            </select>
          </div>

          <Button type="button" variant="outline" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      </div>
    )
  })

  return <div className="flex flex-col gap-6 w-full">{Questions}</div>
}

export default FormQuestions
