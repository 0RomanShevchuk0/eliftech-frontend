import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import "./App.css"
import { Toaster } from "react-hot-toast"

const basepath = "/"

const router = createRouter({ routeTree, basepath })
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
			<Toaster position="top-right" toastOptions={{duration: 5000}} />
    </QueryClientProvider>
  )
}

export default App
