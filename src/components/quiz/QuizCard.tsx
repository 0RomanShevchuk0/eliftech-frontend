import { IQuizResponse } from "@/types/quiz/quiz.types"
import { FC } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import OptionsIcon from "@/assets/icons/ellipsis-vertical.svg"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { quizzesService } from "@/services/quizzes.service"
import { toast } from "react-hot-toast"
import { useNavigate } from "@tanstack/react-router"
import { appQueries } from "@/config/querues.config"

const QuizCard: FC<{ quiz: IQuizResponse }> = ({ quiz }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const quizDeleteMutation = useMutation({
    mutationFn: (id: string) => quizzesService.deleteQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [appQueries.quizzes] })
      toast.success("Quiz successfully deleted")
    },
    onError: () => {
      toast.error("Error deleting quiz")
    },
  })

  return (
    <div
      className="flex flex-col border-1 text-start min-h-40 justify-between py-2 px-3 cursor-pointer"
      onClick={() => navigate({ to: `/quiz-response/${quiz.id}` })}
    >
      <div className="flex justify-between w-full">
        <div>
          <div>{quiz.name}</div>
          <div>{quiz.description}</div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <img src={OptionsIcon} alt="options" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                navigate({ to: `/quiz-builder/${quiz.id}` })
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                quizDeleteMutation.mutateAsync(quiz.id)
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>Questions: {quiz._count.questions}</div>
    </div>
  )
}

export default QuizCard
