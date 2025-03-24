import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { FC, useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"
import { appQueries } from "@/config/querues.config"
import { quizzesService } from "@/services/quizzes.service"
import QuizCard from "@/components/quiz/QuizCard"
import Button from "@/components/ui/Button"
import { appRoutes } from "@/config/routes.config"
import Heading from "@/components/ui/Heading"
import Select from "@/components/ui/Select"
import { QUIZZES_SORT_OPTIONS } from "@/constants/quiz.constants"
import { useInView } from "react-intersection-observer"
import { IQuizWithCount } from "@/types/quiz/quiz.types"

const QuizzesPage: FC = () => {
  // const { ref, inView } = useInView()
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState(QUIZZES_SORT_OPTIONS[0].value)

  const { data: response, isLoading } = useQuery({
    queryKey: [appQueries.quizzes, page, sortBy],
    queryFn: () => quizzesService.getQuizzes({ page, limit: 10, sortBy }),
  })
  console.log(" response:", response)

  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage()
  //   }
  // }, [fetchNextPage, inView])

  if (isLoading) {
    return "Loading..."
  }

  const Cards = response?.data.items.map((q) => <QuizCard key={q.id} quiz={q} />)

  return (
    <div className="text-start">
      <Heading>Quiz Catalog</Heading>
      <div className="flex justify-between items-center my-4">
        <div className="flex items-center gap-3">
          <span className="shrink-0">Sort by:</span>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {QUIZZES_SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <Link to={appRoutes.quizBuilder}>
          <Button className="border-1">Create New</Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-10">{Cards}</div>
    </div>
  )
}

export default QuizzesPage
