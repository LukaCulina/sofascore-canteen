import { createFileRoute } from "@tanstack/react-router"
import { MealCatalogPage } from "@/pages/MealCatalog"

export const Route = createFileRoute("/_app/catering/catalog")({
  component: MealCatalogPage,
  head: () => ({
    meta: [
      {
        title: "Home :: Meal Catalog",
      },
    ],
  }),
})
