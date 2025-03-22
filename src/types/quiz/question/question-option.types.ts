export interface IQuestionOption {
  id: string
  text: string
  question_id: string
}

export interface IOptionFormState extends Omit<IQuestionOption, "id" | "question_id"> {}
