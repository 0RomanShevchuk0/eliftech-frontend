import { appRoutes } from "@/config/routes.config"
import QuizResponsePage from "@/pages/QuizResponsePage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(appRoutes.quizResponseQuizId)({
  component: QuizResponsePage,
})
