import { HTTP_STATUS } from "./httpStatuses"

export const ERROR_MESSAGES: Record<number, string> = {
  [HTTP_STATUS.BAD_REQUEST_400]: "Bad request. Please check your input.",
  [HTTP_STATUS.UNAUTHORIZED_401]: "Unauthorized. Please log in.",
  [HTTP_STATUS.FORBIDDEN_403]: "Forbidden. You don't have permission.",
  [HTTP_STATUS.NOT_FOUND_404]: "Not found. The requested resource doesn't exist.",
  [HTTP_STATUS.CONFLICT_409]: "Conflict. This resource already exists.",
  [HTTP_STATUS.INTERNAL_SERVER_ERROR_500]: "Server error. Please try again later.",
  [HTTP_STATUS.SERVICE_UNAVAILABLE_503]: "Service unavailable. Try again later.",
}

export const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again."
