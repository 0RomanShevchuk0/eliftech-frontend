import QuizResponseForm from "@/components/quiz/quiz-response/QuizResponseForm"
import Heading from "@/components/ui/Heading"
import { appRoutes } from "@/config/routes.config"
import { formatDuration } from "@/utils/format-duration"
import { useLoaderData } from "@tanstack/react-router"
import { FC, useState, useEffect, useRef } from "react"

const QuizResponsePage: FC = () => {
  const quiz = useLoaderData({ from: appRoutes.quizResponseQuizId })?.data

  const [completionTime, setCompletionTime] = useState(0)
  const completionTimeTimeRef = useRef(completionTime)

  useEffect(() => {
    completionTimeTimeRef.current = completionTime
  }, [completionTime])

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletionTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!quiz?.id) {
    return <Heading level={3}>Quiz not found</Heading>
  }

  return (
    <div className="text-start">
      <Heading>{quiz.name} Response</Heading>
      <p>{quiz.description}</p>
      <hr className="my-4 border-gray-300" />

      <div className="flex items-center justify-between">
        <Heading level={2} className="mt-4">
          Questions
        </Heading>
        <p>Completion Time: {formatDuration(completionTime)}</p>
      </div>

      <QuizResponseForm quiz={quiz} completionTimeRef={completionTimeTimeRef} />
    </div>
  )
}

export default QuizResponsePage
