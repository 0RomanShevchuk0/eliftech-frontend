import { createFileRoute } from "@tanstack/react-router"
import { toast } from "react-hot-toast"
import { AxiosError } from "axios"
import { appRoutes } from "@/config/routes.config"
import QuizBuilderPage from "@/pages/QuizBuilderPage"
import { quizzesService } from "@/services/quizzes.service"
import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGES } from "@/constants/errorMessages"

export const Route = createFileRoute(appRoutes.quizBuilderQuizId)({
  component: QuizBuilderPage,
  loader: async ({ params }) => {
    try {
      const quiz = await quizzesService.getQuizById(params.quizId)
      return quiz
    } catch (error) {
      let errorMessage = DEFAULT_ERROR_MESSAGE
      if (error instanceof AxiosError) {
        errorMessage =
          ERROR_MESSAGES[error.response?.status || 0] ||
          error.response?.data?.message ||
          DEFAULT_ERROR_MESSAGE
      }
      toast.error(errorMessage)
    }
  },
})
