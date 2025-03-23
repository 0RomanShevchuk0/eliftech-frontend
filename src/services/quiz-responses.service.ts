import { axiosClassic } from "@/api"
import { IQuizResponse } from "@/types/quiz/quiz.types"
import { IResponseFormState } from "@/types/quiz/response/response.types"

class QuizResponsesService {
  #getBaseUrl = (quizId: string) => {
    return `/quizzes/${quizId}/responses`
  }

  getQuizResponses = async (quizId: string) => {
    const apiUrl = this.#getBaseUrl(quizId)
    const response = await axiosClassic.get<IQuizResponse[]>(apiUrl)
    return response
  }

  createQuizResponse = async (data: IResponseFormState) => {
    const apiUrl = this.#getBaseUrl(data.quiz_id)
    const response = await axiosClassic.post(apiUrl, data)
    return response
  }

  deleteQuiz = async (quizId: string, responseId: string) => {
    const apiUrl = `${this.#getBaseUrl(quizId)}/${responseId}`
    const response = await axiosClassic.delete(apiUrl)
    return response
  }
}

export const quizResponsesService = new QuizResponsesService()
