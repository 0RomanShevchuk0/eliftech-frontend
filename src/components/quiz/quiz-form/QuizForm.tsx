import { FC } from "react"
import { SubmitHandler } from "react-hook-form"
import { CreateQuizType } from "../../../types/quiz/quiz.types"
import FormField from "../../ui/FormField"
import Button from "../../ui/Button"
import { useLoaderData, useNavigate, useParams } from "@tanstack/react-router"
import { appRoutes } from "../../../config/routes.config"
import { toast } from "react-hot-toast"
import FormQuestion from "./question/FormQuestion"
import { useQuizForm } from "../../../hooks/useQuizForm"
import { useQuizMutations } from "../../../hooks/useQuizMutations"

const QuizForm: FC = () => {
  const params = useParams({ strict: false })
  const quiz = params.quizId ? useLoaderData({ from: appRoutes.quizBuilderQuizId })?.data : null
  const isNewQuiz = !quiz?.id

  const navigate = useNavigate()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    questionsFieldArray,
  } = useQuizForm(quiz)

  const { updateQuizMutation, createQuizMutation } = useQuizMutations()

  const onSubmit: SubmitHandler<CreateQuizType> = async (data) => {
    try {
      let toastMessage = "Quiz successfully created!"
      if (isNewQuiz) {
        await createQuizMutation.mutateAsync(data)
      } else {
        toastMessage = "Quiz successfully updated!"

        await updateQuizMutation.mutateAsync({ quizId: quiz.id, data })
      }

      toast.success(toastMessage)

      navigate({ to: appRoutes.quizzes })
    } catch (error) {
      const errorMessage = `Error ${isNewQuiz ? "creating" : "updating"} quiz`
      console.error(errorMessage, error)
      toast.error(errorMessage)
    }
  }

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

      <Button
        type="submit"
        className="self-center w-1/12"
        disabled={createQuizMutation.isPending || updateQuizMutation.isPending}
      >
        {isNewQuiz ? "Create" : "Update"}
      </Button>
    </form>
  )
}

export default QuizForm
