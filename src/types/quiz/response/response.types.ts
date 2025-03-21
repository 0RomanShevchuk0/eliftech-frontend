import { IAnswer } from "./answer.types"

export interface IResponse {
  id: string
  title: string
  order: number

  quiz_id: string
  answers: IAnswer[]
}

export type AnswerFormStateType = Omit<IResponse, "id">
