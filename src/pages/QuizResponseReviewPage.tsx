import QuizResponseForm from "@/components/quiz/quiz-response/QuizResponseForm"
import QuizResponseFormHeader from "@/components/quiz/quiz-response/QuizResponseFormHeader"
import Heading from "@/components/ui/Heading"
import { appRoutes } from "@/config/routes.config"
import { useLoaderData } from "@tanstack/react-router"
import { FC } from "react"

const QuizResponseReviewPage: FC = () => {
  const { quiz, response } = useLoaderData({
    from: appRoutes.quizResponseReviewQuizIdResponseId,
  })

  if (!quiz?.id) {
    return <Heading level={3}>Quiz not found</Heading>
  }
  if (!response?.id) {
    return <Heading level={3}>Response not found</Heading>
  }

  return (
    <div className="text-start">
      <QuizResponseFormHeader quiz={quiz} completionTime={response.completion_time} />
      <QuizResponseForm quiz={quiz} response={response} readonly />
    </div>
  )
}

export default QuizResponseReviewPage
