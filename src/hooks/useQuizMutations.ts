import { useMutation } from "@tanstack/react-query"
import { CreateQuizType } from "../types/quiz/quiz.types"
import { quizzesService } from "../services/quizzes.service"

export const useQuizMutations = () => {
  const createQuizMutation = useMutation({
    mutationFn: (data: CreateQuizType) => quizzesService.createQuiz(data),
  })

  const updateQuizMutation = useMutation({
    mutationFn: ({ quizId, data }: { quizId: string; data: CreateQuizType }) =>
      quizzesService.updateQuiz(quizId, data),
  })

  return { createQuizMutation, updateQuizMutation }
}
