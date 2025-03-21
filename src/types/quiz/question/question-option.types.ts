export interface IQuestionOption {
  id: string
  text: string
  question_id: string
}

export type QuestionOptionFormStateType = Omit<IQuestionOption, "id">