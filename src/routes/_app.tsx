import { createFileRoute, redirect } from "@tanstack/react-router"
import { AppLayout } from "@/components/layout"
import { useAuthStore } from "@/stores/auth"

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    const { token } = useAuthStore.getState()
    if (!token) {
      throw redirect({ to: "/login" })
    }
  },
  component: AppLayout,
})
