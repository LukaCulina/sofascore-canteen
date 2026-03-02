import { createRootRoute, Outlet } from "@tanstack/react-router"
import { SWRConfig } from "swr"
import { getJson } from "@/api/http-client"

const RootLayout = () => {
  return (
    <SWRConfig value={{ fetcher: (args) => getJson(args) }}>
      <Outlet />
    </SWRConfig>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
