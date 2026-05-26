import { createRouter, RouterProvider } from "@tanstack/react-router"
import { StrictMode, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import { IntlProvider } from "react-intl"
import { type Locale, useLocaleStore } from "@/stores/locale"
import { routeTree } from "./routeTree.gen"
import "./index.css"

const messageLoaders = import.meta.glob<{ default: Record<string, string> }>("./i18n/*.json")

const loadMessages = async (locale: Locale) => {
  const loader = messageLoaders[`./i18n/${locale}.json`]

  if (!loader) {
    const fallbackLoader = messageLoaders["./i18n/en.json"]
    if (!fallbackLoader) return {}
    return (await fallbackLoader()).default
  }

  return (await loader()).default
}

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

function App() {
  const locale = useLocaleStore((s) => s.locale)
  const [messages, setMessages] = useState<Record<string, string> | null>(null)
  const [activeLocale, setActiveLocale] = useState<Locale>(locale)

  useEffect(() => {
    let isMounted = true

    loadMessages(locale)
      .then((nextMessages) => {
        if (isMounted) {
          setMessages(nextMessages)
          setActiveLocale(locale)
        }
      })
      .catch((err) => {
        console.error(`Failed to load messages for locale "${locale}"`, err)
        if (isMounted) {
          setMessages((prev) => prev ?? {})
          setActiveLocale(locale)
        }
      })

    return () => {
      isMounted = false
    }
  }, [locale])

  if (!messages) return null

  return (
    <IntlProvider locale={activeLocale} messages={messages}>
      <RouterProvider router={router} />
    </IntlProvider>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
