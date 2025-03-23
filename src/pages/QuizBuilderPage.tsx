import QuizForm from "@/components/quiz/quiz-form/QuizForm"
import Heading from "@/components/ui/Heading"
import { FC } from "react"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"

const QuizBuilderPage: FC = () => {
  return (
    <div className="text-start">
      <Heading>Create Quiz</Heading>
      <DndProvider backend={HTML5Backend}>
        <QuizForm />
      </DndProvider>
    </div>
  )
}

export default QuizBuilderPage
