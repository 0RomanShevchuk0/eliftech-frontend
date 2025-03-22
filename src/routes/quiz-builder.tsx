import { appRoutes } from "@/config/routes.config"
import QuizBuilderPage from "@/pages/QuizBuilderPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(appRoutes.quizBuilder)({
  component: QuizBuilderPage,
})

