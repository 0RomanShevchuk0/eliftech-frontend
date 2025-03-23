import { IAnswer, IAnswerFormState } from "./answer.types"

export interface IResponse {
  id: string
	
  completion_time: number
  submitted_at: Date

  quiz_id: string
  answers: IAnswer[]
}

export interface IResponseFormState extends Omit<IResponse, "id" | "answers"> {
  answers: IAnswerFormState[]
}
