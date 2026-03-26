import { createFileRoute, redirect } from "@tanstack/react-router"
import { Orders } from "@/pages/Orders"
import { Role, useAuthStore } from "@/stores/auth"

export const Route = createFileRoute("/_app/orders")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState()
    if (![Role.EMPLOYEE, Role.CATERING].includes(user!.role)) {
      throw redirect({ to: "/" })
    }
  },
  component: Orders,
  head: () => ({
    meta: [
      {
        title: "My Orders :: Canteen",
      },
    ],
  }),
})
