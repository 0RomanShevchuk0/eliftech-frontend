import { QuestionType } from "./enums"
import { IQuestionOption } from "./question-option.types"

export interface IQuestion {
  id: string
  title: string
  type: QuestionType
  order: number

  quiz_id: string

  options: IQuestionOption[]
}

export type QuestionFormStateType = Omit<IQuestion, "id">
