import { createFileRoute, redirect } from "@tanstack/react-router"
import { MyPlans } from "@/pages/MyPlans/MyPlans"
import { Role, useAuthStore } from "@/stores/auth"

export const Route = createFileRoute("/_app/my-plans")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState()
    if (user?.role !== Role.CATERING) {
      throw redirect({ to: "/" })
    }
  },
  component: () => <MyPlans />,
  head: () => ({
    meta: [{ title: "My Plans :: Canteen" }],
  }),
})
