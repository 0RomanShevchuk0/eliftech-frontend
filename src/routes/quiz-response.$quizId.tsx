import { appRoutes } from "@/config/routes.config"
import QuizResponsePage from "@/pages/QuizResponsePage"
import { quizzesService } from "@/services/quizzes.service"
import { safeApiRequest } from "@/utils/safe-request"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(appRoutes.quizResponseQuizId)({
  component: QuizResponsePage,
  loader: async ({ params }) => {
    const response = await safeApiRequest(() => quizzesService.getQuizById(params.quizId))
    return response
  },
})
