import QuizResponseForm from "@/components/quiz/quiz-response/QuizResponseForm"
import Button from "@/components/ui/Button"
import FormField from "@/components/ui/FormField"
import Heading from "@/components/ui/Heading"
import { appRoutes } from "@/config/routes.config"
import { useLoaderData } from "@tanstack/react-router"
import { FC } from "react"

const QuizResponsePage: FC = () => {
  const quiz = useLoaderData({ from: appRoutes.quizResponseQuizId })?.data

  if (!quiz?.id) {
    return <Heading level={3}>Quiz not found</Heading>
  }

  return (
    <div className="text-start">
      <Heading>{quiz.name} Response</Heading>
      <p>{quiz.description}</p>
			<hr className="my-4 border-gray-300" />
			<Heading level={2} className="mt-4">Questions</Heading>
      <QuizResponseForm quiz={quiz} />
    </div>
  )
}

export default QuizResponsePage
