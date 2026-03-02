import { Outlet, useLocation } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { css } from "@/styled-system/css"
import { Flex } from "@/styled-system/jsx"

import { AppHeader } from "./AppHeader"
import { AppSidebar } from "./AppSidebar"

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <Flex minH="100dvh" display="flex">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Flex flexDirection="column" flex="1" minWidth="0" bg="surface.s1">
        <AppHeader onOpenSidebar={() => setSidebarOpen(true)} />
        <main className={css({ flex: "1", p: "4xl", bg: "surface.s0" })}>
          <Outlet />
        </main>
      </Flex>
    </Flex>
  )
}
