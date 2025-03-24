import { PaginationParamsType } from "../pagination"
import { IQuestion, IQuestionFormState } from "./question/question.types"

export interface IQuiz {
  id: string
  name: string
  description: string
  questions: IQuestion[]
}

export interface IQuizFormState extends Omit<IQuiz, "id" | "questions"> {
  questions: IQuestionFormState[]
}

export interface IQuizWithCount extends IQuiz {
  _count: {
    responses: number
    questions: number
  }
}

export type QuizQueryParamsType = {
  sortBy: string
} & PaginationParamsType
