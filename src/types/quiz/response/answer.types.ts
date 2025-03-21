import { IQuestionOption } from "../question/question-option.types"

export interface IAnswer {
  id: string
  text: string
  order: number

  question_id: string
  response_id: string

  selected_options?: IQuestionOption[]
}

export type AnswerFormStateType = Omit<IAnswer, "id">
