import { IQuizFormState } from "@/types/quiz/quiz.types"
import { FC } from "react"
import { Control, UseFormRegister, useFieldArray } from "react-hook-form"
import QuestionOptionItem from "./QuestionOptionItem"
import Button from "@/components/ui/Button"

interface IProps {
  register: UseFormRegister<IQuizFormState>
  control: Control<IQuizFormState>
  index: number
}

const QuestionOptions: FC<IProps> = ({ register, control, index }) => {
  const optionsFieldArray = useFieldArray({
    control,
    name: `questions.${index}.options`,
  })
  const { fields: options, append: addOption } = optionsFieldArray

  return (
    <div className="ml-10">
      <div className="my-2">Answer Options</div>
      <div className="flex flex-col gap-3">
        {options.map((option, optionIndex) => (
          <QuestionOptionItem
            key={option.id}
            register={register}
            questionIndex={index}
            optionIndex={optionIndex}
            optionsFieldArray={optionsFieldArray}
          />
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
  )
}

export default QuestionOptions
