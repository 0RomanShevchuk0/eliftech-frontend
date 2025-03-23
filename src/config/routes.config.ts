export const appRoutes = {
  home: "/",
  quizzes: "/quizzes",
  quizBuilder: "/quiz-builder",
  quizBuilderQuizId: "/quiz-builder/$quizId",
  quizResponseQuizId: "/quiz-response/$quizId",
  quizResponseReviewQuizIdResponseId: "/quiz-response-review/$quizId/$responseId",
} as const
