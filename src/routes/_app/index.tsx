import { createFileRoute } from "@tanstack/react-router"
import { CanteenPage } from "@/pages/Canteen"

export const Route = createFileRoute("/_app/")({
  component: CanteenPage,
  head: () => ({
    meta: [
      {
        title: "Home :: Canteen",
      },
    ],
  }),
})
