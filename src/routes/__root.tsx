import Header from "@/layout/Header"
import { createRootRoute, Outlet } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-col flex-grow overflow-hidden h-full">
        <Header />
        <div className="p-6 flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  ),
})
