import { axiosClassic } from "../api"
import { IQuizFormState, IQuizResponse } from "../types/quiz/quiz.types"

class QuizzesService {
  private BASE_URL = "/quizzes"

  // getQuizzes = async (params?: QuizQueryParamsType) => {
  //   const queryParams = Object.entries(params || {})
  //     .map(([param, value]) => `${param}=${value}`)
  //     .join("&")
  //   const response = await axiosClassic.get<PaginationResponse<IQuiz>>(
  //     `${this.BASE_URL}?${queryParams}`
  //   )
  //   return response
  // }
  getQuizzes = async () => {
    const response = await axiosClassic.get<IQuizResponse[]>(`${this.BASE_URL}`)
    return response
  }

  getQuizById = async (id: string) => {
    const response = await axiosClassic.get<IQuizResponse>(`${this.BASE_URL}/${id}`)
    return response
  }

  createQuiz = async (quiz: IQuizFormState) => {
    const response = await axiosClassic.post(this.BASE_URL, quiz)
    return response
  }

  updateQuiz = async (id: string, quiz: IQuizFormState) => {
    const response = await axiosClassic.patch(`${this.BASE_URL}/${id}`, quiz)
    return response
  }

  deleteQuiz = async (id: string) => {
    const response = await axiosClassic.delete(`${this.BASE_URL}/${id}`)
    return response
  }
}

export const quizzesService = new QuizzesService()
