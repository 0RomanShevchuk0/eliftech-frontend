import { IAnswer, IAnswerFormState } from "./answer.types"

export interface IResponse {
  id: string
  title: string
  order: number

  quiz_id: string
  answers: IAnswer[]
}

export interface IResponseFormState extends Omit<IResponse, "id" | "answers"> {
  answers: IAnswerFormState[]
}
