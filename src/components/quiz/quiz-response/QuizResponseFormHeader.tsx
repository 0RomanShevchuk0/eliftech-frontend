import Heading from "@/components/ui/Heading"
import { IQuizWithCount } from "@/types/quiz/quiz.types"
import { formatDuration } from "@/utils/format-duration"
import { FC } from "react"

interface IProps {
  quiz: IQuizWithCount
  completionTime: number
}

const QuizResponseFormHeader: FC<IProps> = ({ quiz, completionTime }) => {
  return (
    <div>
      <Heading>{quiz.name} Response</Heading>
      <p>{quiz.description}</p>
      <hr className="my-4 border-gray-300" />

      <div className="flex items-center justify-between">
        <Heading level={2} className="mt-4">
          Questions
        </Heading>
        <p>Completion Time: {formatDuration(completionTime)}</p>
      </div>
    </div>
  )
}

export default QuizResponseFormHeader
