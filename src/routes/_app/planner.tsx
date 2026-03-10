import { createFileRoute } from "@tanstack/react-router"
import { Planner } from "@/pages/Planner/Planner"

export const Route = createFileRoute("/_app/planner")({
  component: Planner,
  head: () => ({
    meta: [
      {
        title: "Planner :: Canteen",
      },
    ],
  }),
})