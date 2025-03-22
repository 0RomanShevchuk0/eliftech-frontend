import { FC } from "react"
import { SubmitHandler } from "react-hook-form"
import { useLoaderData, useNavigate, useParams } from "@tanstack/react-router"
import { appRoutes } from "@/config/routes.config"
import { useQuizForm } from "@/hooks/useQuizForm"
import { useQuizMutations } from "@/hooks/useQuizMutations"
import { IQuizFormState } from "@/types/quiz/quiz.types"
import FormField from "@/components/ui/FormField"
import FormQuestion from "./question/FormQuestion"
import Button from "@/components/ui/Button"

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

  const onSubmit: SubmitHandler<IQuizFormState> = async (data) => {
    const orderedQuestionsQuiz: IQuizFormState = {
      ...data,
      questions: data.questions.map((q, i) => ({
        ...q,
        order: i + 1,
      })),
    }

    if (isNewQuiz) {
      await createQuizMutation.mutateAsync(orderedQuestionsQuiz)
    } else {
      await updateQuizMutation.mutateAsync({ quizId: quiz.id, data: orderedQuestionsQuiz })
    }

    navigate({ to: appRoutes.quizzes })
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
