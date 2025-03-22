import { FC } from "react"
import Heading from "../components/ui/Heading"
import QuizForm from "../components/quiz/quiz-form/QuizForm"

const QuizBuilderPage: FC = () => {
  return (
    <div className="text-start">
      <Heading>Create Quiz</Heading>
      <QuizForm />
    </div>
  )
}

export default QuizBuilderPage
