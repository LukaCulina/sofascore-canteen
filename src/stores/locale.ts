import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Locale = "en" | "hr"

interface LocaleState {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const getDefaultLocale = (): Locale => {
  if (typeof window === "undefined") return "en"
  const browserLang = navigator.language
  return browserLang.startsWith("hr") ? "hr" : "en"
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: getDefaultLocale(),
      setLocale: (locale) => set({ locale }),
    }),
    { name: "locale" },
  ),
)
