import { FC } from "react"
import Button from "../../ui/Button"
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayReturn,
  UseFormRegister,
  useFieldArray,
  useWatch,
} from "react-hook-form"
import { CreateQuizType } from "../../../types/quiz/quiz.types"
import { QuestionType } from "../../../types/quiz/question/enums"
import Input from "../../ui/Input"
import Select from "../../ui/Select"

interface IProps {
  field: FieldArrayWithId<CreateQuizType, "questions", "id">
  register: UseFormRegister<CreateQuizType>
  control: Control<CreateQuizType>
  index: number
  fieldsArray: UseFieldArrayReturn<CreateQuizType, "questions", "id">
}

const inputClass = "border-1 border-gray-800 px-2 py-1 focus:border-black outline-none w-full"

const questionTypeOptions: { value: QuestionType; label: string }[] = [
  { value: "TEXT", label: "Text" },
  { value: "SINGLE_CHOICE", label: "Single choice" },
  { value: "MULTIPLE_CHOICES", label: "Multiple choices" },
]

const FormQuestion: FC<IProps> = ({ field, register, control, index, fieldsArray }) => {
  const SelectOptionsElements = questionTypeOptions.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))

  const watchOutput = useWatch({ name: "questions", control })

  const { remove } = fieldsArray

  const {
    fields: options,
    remove: removeOption,
    append: addOption,
  } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  })

  return (
    <div>
      <div key={field.id} className="flex items-end gap-6 w-full">
        <span className="font-semibold">{field.order}.</span>
        <div className="flex flex-col gap-3 h-full w-full">
          <div className="flex gap-3 items-end w-full">
            <div className="flex flex-col items-start gap-1 w-full">
              <label>Question</label>
              <Input key={`title:${field.id}`} {...register(`questions.${index}.title` as const)} />
            </div>

            <div className="flex flex-col items-start gap-1 w-1/4">
              <label>Type</label>
              <Select
                key={`type:${field.id}`}
                {...register(`questions.${index}.type` as const)}
                className={inputClass}
              >
                {SelectOptionsElements}
              </Select>
            </div>

            <Button type="button" variant="outline" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        </div>
      </div>

      {watchOutput[index]?.type !== "TEXT" && (
        <div className="ml-10">
          <div className="my-2">Answer Options</div>
          <div className="flex flex-col gap-3">
            {options.map((option, optionIndex) => (
              <div key={option.id}>
                <span>Choice</span>
                <div className="flex items-center gap-4 w-full">
                  <span className="font-semibold">{optionIndex + 1}.</span>
                  <div key={option.id} className="flex gap-2 items-center w-2/3">
                    <Input {...register(`questions.${index}.options.${optionIndex}.text`)} />
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => removeOption(optionIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            type="button"
            onClick={() => addOption({ text: "" })}
            className="text-blue-500"
          >
            Add Option
          </Button>
        </div>
      )}
    </div>
  )
}

export default FormQuestion
