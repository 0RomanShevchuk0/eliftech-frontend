export interface IQuestionOption {
  id: string
  text: string
  question_id: string
}

export interface ICreateQuizOption extends Omit<IQuestionOption, "id" | "question_id"> {}
