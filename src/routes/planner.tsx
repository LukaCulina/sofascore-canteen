import { createFileRoute } from "@tanstack/react-router"

const PlannerPage = () => {
  return <div>Planner page</div>
}

export const Route = createFileRoute("/planner")({
  component: PlannerPage,
  head: () => ({
    meta: [
      {
        title: "Planner :: Canteen",
      },
    ],
  }),
})