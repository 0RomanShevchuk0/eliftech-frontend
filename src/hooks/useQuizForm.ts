import { useFieldArray, useForm } from "react-hook-form"
import { IQuizFormState, IQuiz, IQuizResponse } from "../types/quiz/quiz.types"

export const useQuizForm = (quiz: IQuiz | IQuizResponse | null | undefined) => {
  const formMethods = useForm<IQuizFormState | IQuiz>({
    values: !quiz?.id
      ? undefined
      : {
          id: quiz.id,
          name: quiz.name,
          description: quiz.description,
          questions: quiz.questions,
        },
  })

  const questionsFieldArray = useFieldArray({
    name: "questions",
    control: formMethods.control,
    rules: { minLength: 1, required: true },
  })

  return { ...formMethods, questionsFieldArray }
}
