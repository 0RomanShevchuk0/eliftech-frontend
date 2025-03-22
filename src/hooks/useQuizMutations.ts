import { useMutation } from "@tanstack/react-query"
import { IQuizFormState } from "../types/quiz/quiz.types"
import { quizzesService } from "../services/quizzes.service"

export const useQuizMutations = () => {
  const createQuizMutation = useMutation({
    mutationFn: (data: IQuizFormState) => quizzesService.createQuiz(data),
  })

  const updateQuizMutation = useMutation({
    mutationFn: ({ quizId, data }: { quizId: string; data: IQuizFormState }) =>
      quizzesService.updateQuiz(quizId, data),
  })

  return { createQuizMutation, updateQuizMutation }
}
