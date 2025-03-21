import { createFileRoute } from "@tanstack/react-router"
import { appRoutes } from "../config/routes.config"
import HomePage from "../pages/HomePage"

export const Route = createFileRoute(appRoutes.home)({
  component: HomePage,
})
