import { createFileRoute, redirect } from "@tanstack/react-router"
import { Role, useAuthStore } from "@/stores/auth"

export const Route = createFileRoute("/_app/my-plans")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState()
    if (user?.role !== Role.CATERING) {
      throw redirect({ to: "/" })
    }
  },
  component: () => <div>My Plans - placeholder</div>,
  head: () => ({
    meta: [{ title: "My Plans :: Canteen" }],
  }),
})
