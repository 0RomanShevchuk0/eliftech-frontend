import { QuestionType } from "./enums"
import { ICreateQuizOption, IQuestionOption } from "./question-option.types"

export interface IQuestion {
  id: string
  title: string
  type: QuestionType
  order: number

  quiz_id: string

  options: IQuestionOption[]
}

export interface ICreateQuizQuestion extends Omit<IQuestion, "id" | "quiz_id" | "options"> {
  options?: ICreateQuizOption[]
}
