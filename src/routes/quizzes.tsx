import { appRoutes } from "@/config/routes.config"
import QuizzesPage from "@/pages/QuizzesPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(appRoutes.quizzes)({
  component: QuizzesPage,
})
