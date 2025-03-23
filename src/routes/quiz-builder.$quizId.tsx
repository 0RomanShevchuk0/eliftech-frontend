import { createFileRoute } from "@tanstack/react-router"
import { appRoutes } from "@/config/routes.config"
import QuizBuilderPage from "@/pages/QuizBuilderPage"
import { quizzesService } from "@/services/quizzes.service"
import { safeApiRequest } from "@/utils/safe-request"

export const Route = createFileRoute(appRoutes.quizBuilderQuizId)({
  component: QuizBuilderPage,
  loader: async ({ params }) => {
    const response = await safeApiRequest(() => quizzesService.getQuizById(params.quizId))
		return response
  },
})
