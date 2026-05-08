import { createFileRoute, redirect } from "@tanstack/react-router"
import { MealDetailsPage } from "@/pages/MealCatalog/MealDetails"
import { Role, useAuthStore } from "@/stores/auth"

export const Route = createFileRoute("/_app/meals/$id")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState()
    if (user?.role !== Role.CATERING && user?.role !== Role.ADMIN) {
      throw redirect({ to: "/" })
    }
  },
  component: MealDetailsPage,
  head: () => ({
    meta: [{ title: "Edit Meal :: Canteen" }],
  }),
})
