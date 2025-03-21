import { createFileRoute } from "@tanstack/react-router"
import { appRoutes } from "../config/routes.config"
import QuizBuilderPage from "../pages/QuizBuilderPage"
import { quizzesService } from "../services/quizzes.service"

export const Route = createFileRoute(appRoutes.quizBuilderQuizId)({
  component: QuizBuilderPage,
  loader: async ({ params }) => {
    return quizzesService.getQuizById(params.quizId)
  },
})
