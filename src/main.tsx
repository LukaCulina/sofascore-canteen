import { createRouter, RouterProvider } from "@tanstack/react-router"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { routeTree } from "./routeTree.gen"
import "./index.css"
import { IntlProvider } from "react-intl"

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntlProvider locale="en-US">
      <RouterProvider router={router} />
    </IntlProvider>
  </StrictMode>,
)
