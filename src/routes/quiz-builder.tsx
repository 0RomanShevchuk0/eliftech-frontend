import { createFileRoute } from "@tanstack/react-router"
import { appRoutes } from "../config/routes.config"
import QuizBuilderPage from "../pages/QuizBuilderPage"

export const Route = createFileRoute(appRoutes.quizBuilder)({
  component: QuizBuilderPage,
})

