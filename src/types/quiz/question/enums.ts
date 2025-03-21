export const QuestionTypesEnum = {
  TEXT: "TEXT",
  SINGLE_CHOICE: "SINGLE_CHOICE",
  MULTIPLE_CHOICES: "MULTIPLE_CHOICES",
} as const

export type QuestionType = (typeof QuestionTypesEnum)[keyof typeof QuestionTypesEnum]