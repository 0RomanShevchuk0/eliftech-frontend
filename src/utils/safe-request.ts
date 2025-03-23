import { AxiosError } from "axios"
import { toast } from "react-hot-toast"
import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGES } from "@/constants/errorMessages"

export async function safeApiRequest<T>(apiRequestCallback: () => Promise<T>): Promise<T | null> {
  try {
    return await apiRequestCallback()
  } catch (error) {
    let errorMessage = DEFAULT_ERROR_MESSAGE

    if (error instanceof AxiosError) {
      errorMessage =
        ERROR_MESSAGES[error.response?.status || 0] ||
        error.response?.data?.message ||
        DEFAULT_ERROR_MESSAGE
    }

    toast.error(errorMessage)
    return null
  }
}
