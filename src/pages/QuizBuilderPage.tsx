import { FC } from "react"
import Heading from "../components/ui/Heading"
import { useForm, SubmitHandler } from "react-hook-form"
import Button from "../components/ui/Button"
import FormField from "../components/ui/FormField"

type Inputs = {
  example: string
  exampleRequired: string
}

const QuizBuilderPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div className="text-start">
      <Heading>Create Quiz</Heading>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-4">
        <FormField
          label="example"
          type="text"
          register={register("example", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
          error={errors.example}
        />
        <FormField
          label="example"
          type="text"
          register={register("example", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
          error={errors.example}
        />

        <Button>Submit</Button>
      </form>
    </div>
  )
}

export default QuizBuilderPage
