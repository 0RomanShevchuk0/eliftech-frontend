import { FC } from "react"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { CreateQuizType, IQuiz } from "../../../types/quiz/quiz.types"
import FormField from "../../ui/FormField"
import Button from "../../ui/Button"
import { useMutation } from "@tanstack/react-query"
import { quizzesService } from "../../../services/quizzes.service"
import { useLoaderData, useNavigate, useParams } from "@tanstack/react-router"
import { appRoutes } from "../../../config/routes.config"
import { toast } from "react-hot-toast"
import FormQuestion from "./question/FormQuestion"
import { HTTP_STATUS } from "../../../constants/httpStatuses"

const QuizForm: FC = () => {
  const { quizId } = useParams({ strict: false })
  const quiz = quizId ? useLoaderData({ from: appRoutes.quizBuilderQuizId }) : null

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateQuizType | IQuiz>({
    values: quiz?.data,
  })

  const quizMutation = useMutation({
    mutationFn: (data: CreateQuizType) => quizzesService.createQuiz(data),
  })

  // TODO: add update func

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<CreateQuizType> = async (data) => {
    console.log(data)

    try {
      const { status } = await quizMutation.mutateAsync(data)
      if (status === HTTP_STATUS.CREATED_201) {
        toast.success("Quiz successfully created!")
        navigate({ to: appRoutes.quizzes })
      }
    } catch (error) {
      console.error("Error creating quiz")
      toast.error("Error creating quiz")
    }
  }

  const questionsFieldArray = useFieldArray({
    name: "questions",
    control: control,
    rules: {
      minLength: 1,
      required: true,
    },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-4 text-gray-700"
    >
      <FormField
        label="Name"
        type="text"
        register={register("name", { required: "This field is required" })}
        error={errors.name}
      />
      <FormField
        label="Description"
        type="text"
        register={register("description", { required: "This field is required" })}
        error={errors.name}
      />

      <div className="flex flex-col gap-6 w-full">
        {questionsFieldArray.fields.map((field, index) => (
          <FormQuestion
            key={field.id}
            control={control}
            questionsFieldArray={questionsFieldArray}
            index={index}
            register={register}
          />
        ))}
      </div>

      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          questionsFieldArray.append({
            type: "TEXT",
            title: "",
            order: questionsFieldArray.fields.length + 1,
            options: [],
          })
        }}
      >
        Add Question
      </Button>

      <Button type="submit" className="self-center w-1/12" disabled={quizMutation.isPending}>
        Submit
      </Button>
    </form>
  )
}

export default QuizForm
