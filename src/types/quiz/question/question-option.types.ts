export interface IQuestionOption {
  id: string
  text: string
  question_id: string
	order?: number
}

export interface IOptionFormState extends Omit<IQuestionOption, "id" | "question_id"> {}
