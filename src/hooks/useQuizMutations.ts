import { useMutation } from "@tanstack/react-query"
import { IQuizFormState } from "../types/quiz/quiz.types"
import { quizzesService } from "../services/quizzes.service"
import { toast } from "react-hot-toast"

export const useQuizMutations = () => {
  const createQuizMutation = useMutation({
    mutationFn: (data: IQuizFormState) => quizzesService.createQuiz(data),
    onSuccess: () => {
      toast.success("Quiz successfully created!")
    },
    onError: (error) => {
      console.log("Error creating quiz:", error)
      toast.error("Error creating quiz")
    },
  })

  const updateQuizMutation = useMutation({
    mutationFn: ({ quizId, data }: { quizId: string; data: IQuizFormState }) =>
      quizzesService.updateQuiz(quizId, data),
    onSuccess: () => {
      toast.success("Quiz successfully updated!")
    },
    onError: (error) => {
      console.log("Error updating quiz:", error)
      toast.error("Error updating quiz")
    },
  })

  return { createQuizMutation, updateQuizMutation }
}
