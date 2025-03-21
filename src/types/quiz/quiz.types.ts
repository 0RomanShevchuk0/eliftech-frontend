import { PaginationParamsType } from "../pagination"
import { ICreateQuizQuestion, IQuestion } from "./question/question.types"

export interface IQuiz {
  id: string
  name: string
  description: string
  questions: IQuestion[]
}

export interface CreateQuizType extends Omit<IQuiz, "id" | "questions"> {
  questions: ICreateQuizQuestion[]
}

export interface IQuizResponse extends IQuiz {
  _count: {
    responses: number
    questions: number
  }
}

export type QuizQueryParamsType = {} & PaginationParamsType
