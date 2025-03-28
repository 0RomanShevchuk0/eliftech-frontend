import QuizResponseForm from "@/components/quiz/quiz-response/QuizResponseForm"
import QuizResponseFormHeader from "@/components/quiz/quiz-response/QuizResponseFormHeader"
import Heading from "@/components/ui/Heading"
import SpinLoader from "@/components/ui/Loader"
import { appRoutes } from "@/config/routes.config"
import { quizzesService } from "@/services/quizzes.service"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { FC, useState, useEffect, useRef } from "react"

const QuizResponsePage: FC = () => {
  const { quizId } = useParams({ from: appRoutes.quizResponseQuizId })
  const { data, isLoading } = useQuery({
    queryKey: ["quizId", quizId],
    queryFn: () => quizzesService.getQuizById(quizId),
  })
  const quiz = data?.data

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

  if (isLoading) {
    return <SpinLoader />
  }

  if (!quiz?.id) {
    return <Heading level={3}>Quiz not found</Heading>
  }

  return (
    <div className="text-start">
      <QuizResponseFormHeader quiz={quiz} completionTime={completionTime} />
      <QuizResponseForm quiz={quiz} completionTimeRef={completionTimeTimeRef} />
    </div>
  )
}

export default QuizResponsePage
