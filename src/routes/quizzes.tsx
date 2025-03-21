import { createFileRoute } from "@tanstack/react-router"
import QuizzesPage from "../pages/QuizzesPage"

export const Route = createFileRoute("/quizzes")({
  component: QuizzesPage,
})
