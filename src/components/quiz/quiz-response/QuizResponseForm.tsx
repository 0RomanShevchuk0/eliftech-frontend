import Button from "@/components/ui/Button"
import FormField from "@/components/ui/FormField"
import { IAnswerFormState } from "@/types/quiz/response/answer.types"
import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import { FC, memo } from "react"
import { useMutation } from "@tanstack/react-query"
import { IResponse, IResponseFormState } from "@/types/quiz/response/response.types"
import toast from "react-hot-toast"
import { IQuizWithCount } from "@/types/quiz/quiz.types"
import { quizResponsesService } from "@/services/quiz-responses.service"
import ChoiceQuestionField from "./ChoiceQuestionField"
import { IQuestion } from "@/types/quiz/question/question.types"
import { useNavigate } from "@tanstack/react-router"
import { appRoutes } from "@/config/routes.config"

interface IFormFields {
  answers: IAnswerFormState[]
}

interface IProps {
  quiz: IQuizWithCount
  completionTimeRef?: React.RefObject<number>
  readonly?: boolean
  response?: IResponse
}

const QuizResponseForm: FC<IProps> = memo(
  ({ quiz, completionTimeRef, readonly, response }) => {
    const navigate = useNavigate()

    const createResponseAnswers: IAnswerFormState[] = quiz.questions.map((q: IQuestion) => ({
      question_id: q.id,
      text: "",
      selected_options: [],
    }))

    const reviewResponseAnsers: IAnswerFormState[] = response
      ? response?.answers.map((a) => {
          const question = quiz.questions.find((q) => q.id === a.question_id)
          const options =
            question?.type === "SINGLE_CHOICE"
              ? (a.selected_options?.[0].id as any)
              : a.selected_options?.map((o) => o.id)

          return {
            question_id: a.question_id,
            text: a.text,
            selected_options: options || [],
          }
        })
      : []

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormFields>({
      values: {
        answers: response ? reviewResponseAnsers : createResponseAnswers,
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
      if (readonly || !completionTimeRef) {
        return
      }
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
      const res = await createResposneMutation.mutateAsync(responseData)
      navigate({ to: `/quiz-response-review/${res.data.quiz_id}/${res.data.id}` })
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
                readonly={readonly}
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
                  readonly={readonly}
                />
              </>
            )}
          </div>
        ))}

        {!readonly && (
          <Button type="submit" className="self-center" disabled={createResposneMutation.isPending}>
            Submit
          </Button>
        )}
      </form>
    )
  },
  (prevProps, nextProps) => prevProps.quiz.id === nextProps.quiz.id
)

export default QuizResponseForm
