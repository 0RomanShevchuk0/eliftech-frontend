import Button from "@/components/ui/Button"
import FormField from "@/components/ui/FormField"
import { IAnswerFormState } from "@/types/quiz/response/answer.types"
import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import { FC, memo } from "react"
import { useMutation } from "@tanstack/react-query"
import { IResponseFormState } from "@/types/quiz/response/response.types"
import toast from "react-hot-toast"
import { IQuizResponse } from "@/types/quiz/quiz.types"
import { quizResponsesService } from "@/services/quiz-responses.service"
import ChoiceQuestionField from "./ChoiceQuestionField"
import { IQuestion } from "@/types/quiz/question/question.types"
import { useNavigate } from "@tanstack/react-router"
import { appRoutes } from "@/config/routes.config"

interface IFormFields {
  answers: IAnswerFormState[]
}

interface IProps {
  quiz: IQuizResponse
  completionTimeRef: React.RefObject<number>
}

const QuizResponseForm: FC<IProps> = memo(
  ({ quiz, completionTimeRef }) => {
    const navigate = useNavigate()

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormFields>({
      values: {
        answers: quiz.questions.map((q: IQuestion) => ({
          question_id: q.id,
          text: "",
          selected_options: [],
        })),
      },
    })

    const createResposneMutation = useMutation({
      mutationFn: (data: IResponseFormState) => quizResponsesService.createQuizResponse(data),
      onSuccess: () => {
        toast.success("Quiz response successfully created!")
        navigate({ to: appRoutes.quizzes })
      },
      onError: (error) => {
        console.log("Error creating quiz response:", error)
        toast.error("Error creating quiz response")
      },
    })

    const onSubmit: SubmitHandler<IFormFields> = async (data) => {
      const responseData: IResponseFormState = {
        quiz_id: quiz.id,
        completion_time: completionTimeRef.current,
        submitted_at: new Date(),
        answers: data.answers.map((o) => ({
          ...o,
          selected_options: Array.isArray(o.selected_options)
            ? o.selected_options
            : [o.selected_options],
        })),
      }
      await createResposneMutation.mutateAsync(responseData)
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 my-5">
        {quiz.questions.map((question, index) => (
          <div key={question.id}>
            {question.type === "TEXT" ? (
              <FormField
                label={`${index + 1}. ${question.title}`}
                type="text"
                register={register(`answers.${index}.text`, { required: "This field is required" })}
                error={errors.answers?.[index]?.text as FieldError}
              />
            ) : (
              <>
                <ChoiceQuestionField
                  question={question}
                  index={index}
                  register={register(`answers.${index}.selected_options`, {
                    required: "This field is required",
                  })}
                  error={errors.answers?.[index]?.selected_options as FieldError}
                />
              </>
            )}
          </div>
        ))}

        <Button type="submit" className="self-center" disabled={createResposneMutation.isPending}>
          Submit
        </Button>
      </form>
    )
  },
  (prevProps, nextProps) => prevProps.quiz.id === nextProps.quiz.id
)

export default QuizResponseForm
