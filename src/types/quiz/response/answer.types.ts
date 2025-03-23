import { IQuestionOption } from "../question/question-option.types"

export interface IAnswer {
  id: string
  text: string

  question_id: string
  response_id: string

  selected_options?: IQuestionOption[]
}

export interface IAnswerFormState extends Omit<IAnswer, "id" | "response_id" | "selected_options"> {
  selected_options: string[]
}
