import { PaginationParamsType } from "../pagination"
import { IQuestion } from "./question/question.types"

export interface IQuiz {
  id: string
  name: string
  description: string
  questions: IQuestion[]
}

export type QuizFormStateType = Omit<IQuiz, "id">

export type QuizQueryParamsType = {} & PaginationParamsType
