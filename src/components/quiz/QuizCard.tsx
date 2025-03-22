import { IQuizResponse } from "@/types/quiz/quiz.types"
import { FC } from "react"

const QuizCard: FC<{ quiz: IQuizResponse }> = ({ quiz }) => {
  return (
    <div className="flex flex-col border-1 text-start min-h-40 justify-between py-2 px-3">
      <div>
        <div>{quiz.name}</div>
        <div>{quiz.description}</div>
      </div>
      <div>Questions: {quiz._count.questions}</div>
    </div>
  )
}

export default QuizCard
