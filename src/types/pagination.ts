export type PaginationParamsType = {
  page?: number
  limit?: number
}

export type PaginationResponse<T> = {
  hasNextPage: boolean
  hasPrevPage: boolean
  page: number
  limit: number
  totalCount: number
  items: T[]
}
