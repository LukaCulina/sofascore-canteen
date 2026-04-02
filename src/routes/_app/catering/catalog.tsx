import { createFileRoute, redirect } from "@tanstack/react-router"
import { MealCatalogPage } from "@/pages/MealCatalog"
import { Role, useAuthStore } from "@/stores/auth"

export const Route = createFileRoute("/_app/catering/catalog")({
  beforeLoad: () => {
    const { user } = useAuthStore.getState()
    if (user?.role !== Role.CATERING && user?.role !== Role.ADMIN) {
      throw redirect({ to: "/" })
    }
  },
  component: MealCatalogPage,
  head: () => ({
    meta: [
      {
        title: "Meal Catalog :: Canteen",
      },
    ],
  }),
})
