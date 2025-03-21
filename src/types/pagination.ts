export type PaginationParamsType = {
  page?: number
  pageSize?: number
}

export type PaginationResponse<T> = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  pageSize: number
  totalCount: number
  items: T[]
}
