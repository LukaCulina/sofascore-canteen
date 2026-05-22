import { createRootRoute, Outlet } from "@tanstack/react-router"
import { useEffect } from "react"
import { SWRConfig } from "swr"
import { getJson } from "@/api/http-client"
import { useThemeStore } from "@/stores/theme"
import { ToastContainer } from "@/components/ui/Toast"

const RootLayout = () => {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

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
