import { FC } from "react"

const QuizCard: FC = () => {
  return (
    <div className="flex flex-col border-1 text-start min-h-40 justify-between py-2 px-3">
      <div className="">
        <div>Quiz Name</div>
        <div>Quiz Description</div>
      </div>
      <div>Quiz Count</div>
    </div>
  )
}

export default QuizCard
