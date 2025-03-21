import { useQuery } from "@tanstack/react-query"
import { FC } from "react"
import QuizCard from "../components/quiz/QuizCard"
import Heading from "../components/ui/Heading"
import { Link } from "@tanstack/react-router"
import { appRoutes } from "../config/routes.config"
import { quizzesService } from "../services/quizzes.service"
import { appQueries } from "../config/querues.config"
import Button from "../components/ui/Button"

const QuizzesPage: FC = () => {
  const {
    data: response,
    isLoading,
    // error,
  } = useQuery({
    queryKey: [appQueries.quizzes],
    queryFn: () => quizzesService.getQuizzes(),
    retry: false,
  })
  console.log(" response:", response)

  if (isLoading) {
    return "Loading..."
  }

  const Cards = response?.data.map((q) => <QuizCard key={q.id} quiz={q} />)

  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading>Quiz Catalog</Heading>
        <Link to={appRoutes.quizBuilder}>
          <Button className="border-1">Creane New</Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-10">{Cards}</div>
    </div>
  )
}

export default QuizzesPage
