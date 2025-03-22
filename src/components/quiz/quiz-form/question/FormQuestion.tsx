import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { QuestionTypesEnum } from "@/types/quiz/question/enums"
import { IQuizFormState } from "@/types/quiz/quiz.types"
import { FC } from "react"
import { Control, UseFieldArrayReturn, UseFormRegister, useWatch } from "react-hook-form"
import QuestionOptions from "./QuestionOptions"

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

  const { remove, fields } = questionsFieldArray
  const question = fields[index]

  return (
    <div>
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
