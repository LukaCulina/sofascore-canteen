import { createFileRoute } from "@tanstack/react-router"
import { Orders } from "@/pages/Orders"

export const Route = createFileRoute("/_app/orders")({
  component: Orders,
  head: () => ({
    meta: [
      {
        title: "My Orders :: Canteen",
      },
    ],
  }),
})