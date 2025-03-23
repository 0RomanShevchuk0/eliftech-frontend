import { appRoutes } from "@/config/routes.config"
import QuizResponseReviewPage from "@/pages/QuizResponseReviewPage"
import { quizResponsesService } from "@/services/quiz-responses.service"
import { quizzesService } from "@/services/quizzes.service"
import { safeApiRequest } from "@/utils/safe-request"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(appRoutes.quizResponseReviewQuizIdResponseId)({
  component: QuizResponseReviewPage,
  loader: async ({ params }) => {
    const [quiz, response] = await Promise.all([
      safeApiRequest(() => quizzesService.getQuizById(params.quizId)),
      safeApiRequest(() =>
        quizResponsesService.getQuizResponseByid(params.quizId, params.responseId)
      ),
    ])
    return { quiz: quiz?.data, response: response?.data }
  },
})
