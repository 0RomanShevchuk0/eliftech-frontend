import QuizForm from "@/components/quiz/quiz-form/QuizForm"
import Heading from "@/components/ui/Heading"
import { FC } from "react"

const QuizBuilderPage: FC = () => {
  return (
    <div className="text-start">
      <Heading>Create Quiz</Heading>
      <QuizForm />
    </div>
  )
}

export default QuizBuilderPage
