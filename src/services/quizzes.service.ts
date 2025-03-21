// import { PaginationResponse } from "../types/pagination"
import { axiosClassic } from "../api"
import { PaginationResponse } from "../types/pagination"
import { IQuiz, QuizFormStateType, QuizQueryParamsType } from "../types/quiz/quiz.types"

class QuizzesService {
  private BASE_URL = "/quizzes"

  getQuizzes = async (params?: QuizQueryParamsType) => {
    const queryParams = Object.entries(params || {})
      .map(([param, value]) => `${param}=${value}`)
      .join("&")
    const response = await axiosClassic.get<PaginationResponse<IQuiz>>(
      `${this.BASE_URL}?${queryParams}`
    )
    return response
  }

  getQuizById = async (id: string) => {
    const response = await axiosClassic.get<IQuiz>(`${this.BASE_URL}/${id}`)
    return response
  }

  createQuiz = async (task: QuizFormStateType) => {
    const response = await axiosClassic.post(this.BASE_URL, task)
    return response
  }

  updateQuiz = async (id: string, task: QuizFormStateType) => {
    const response = await axiosClassic.patch(`${this.BASE_URL}/${id}`, task)
    return response
  }

  deleteQuiz = async (id: string) => {
    const response = await axiosClassic.delete(`${this.BASE_URL}/${id}`)
    return response
  }
}

export const quizzesService = new QuizzesService()
