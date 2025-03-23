import { QuestionTypesEnum } from "./../types/quiz/question/enums"
import { useFieldArray, useForm } from "react-hook-form"
import { IQuizFormState, IQuiz, IQuizWithCount } from "../types/quiz/quiz.types"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"

const quizSchema: z.ZodSchema<IQuizFormState> = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().min(3, "Description must be at least 3 characters long"),
  questions: z
    .array(
      z.object({
        id: z.string().optional(),
        title: z.string().min(3, "Question title name must be at least 3 characters long"),
        type: z.enum([
          QuestionTypesEnum.TEXT,
          QuestionTypesEnum.SINGLE_CHOICE,
          QuestionTypesEnum.MULTIPLE_CHOICES,
        ]),
        order: z.number(),
        quiz_id: z.string().optional(),
        options: z
          .array(
            z.object({
              id: z.string().optional(),
              text: z.string().min(1, "Option name must be at least 1 characters long"),
              question_id: z.string().optional(),
            })
          )
          .optional(),
      })
    )
    .min(1, "At least one question is required")
    .refine(
      (questions) =>
        questions.every((q) =>
          q.type === QuestionTypesEnum.TEXT ? true : q?.options && q?.options?.length > 0
        ),
      {
        message: "Each non-text question must have at least one option",
        path: [],
      }
    ),
})

export const useQuizForm = (quiz: IQuiz | IQuizWithCount | null | undefined) => {
  const defaultValues: IQuizFormState | undefined = quiz?.id
    ? {
        name: quiz.name,
        description: quiz.description,
        questions: quiz.questions.map((q) => ({
          id: q.id || undefined,
          title: q.title,
          type: q.type,
          order: q.order,
          quiz_id: q.quiz_id || undefined,
          options: q.options.map((o) => ({
            id: o.id || undefined,
            text: o.text,
            question_id: o.question_id || undefined,
          })),
        })),
      }
    : undefined

  const formMethods = useForm<IQuizFormState>({
    resolver: zodResolver(quizSchema),
    defaultValues,
  })

  const questionsFieldArray = useFieldArray({
    name: "questions",
    control: formMethods.control,
    rules: { minLength: 1, required: true },
  })

  useEffect(() => {
    if (quiz) {
      formMethods.reset(defaultValues)
    }
  }, [quiz])

  return { ...formMethods, questionsFieldArray }
}
