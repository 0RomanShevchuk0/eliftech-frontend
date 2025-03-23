import { useQuery } from "@tanstack/react-query"
import { FC } from "react"
import { Link } from "@tanstack/react-router"
import { appQueries } from "@/config/querues.config"
import { quizzesService } from "@/services/quizzes.service"
import QuizCard from "@/components/quiz/QuizCard"
import Button from "@/components/ui/Button"
import { appRoutes } from "@/config/routes.config"
import Heading from "@/components/ui/Heading"

const QuizzesPage: FC = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: [appQueries.quizzes],
    queryFn: () => quizzesService.getQuizzes(),
  })

  if (isLoading) {
    return "Loading..."
  }

  const Cards = response?.data.map((q) => <QuizCard key={q.id} quiz={q} />)

  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading>Quiz Catalog</Heading>
        <Link to={appRoutes.quizBuilder}>
          <Button className="border-1">Create New</Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-10">{Cards}</div>
    </div>
  )
}

export default QuizzesPage
