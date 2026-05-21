import { createRootRoute, Outlet } from "@tanstack/react-router"
import { SWRConfig } from "swr"
import { getJson } from "@/api/http-client"
import { ToastContainer } from "@/components/ui/Toast"

const RootLayout = () => {
  return (
    <>
      <SWRConfig value={{ fetcher: (args) => getJson(args) }}>
        <Outlet />
      </SWRConfig>
      <ToastContainer />
    </>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
