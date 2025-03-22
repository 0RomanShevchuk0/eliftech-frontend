import { QuestionType } from "./enums"
import { IOptionFormState, IQuestionOption } from "./question-option.types"

export interface IQuestion {
  id: string
  title: string
  type: QuestionType
  order: number

  quiz_id: string

  options: IQuestionOption[]
}

export interface IQuestionFormState extends Omit<IQuestion, "id" | "quiz_id" | "options"> {
  options?: IOptionFormState[]
}
