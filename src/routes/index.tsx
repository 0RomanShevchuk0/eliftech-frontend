import { appRoutes } from "@/config/routes.config"
import HomePage from "@/pages/HomePage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(appRoutes.home)({
  component: HomePage,
})
