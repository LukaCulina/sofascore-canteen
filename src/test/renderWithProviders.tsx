import { render } from "@testing-library/react"
import type { ReactElement } from "react"
import { IntlProvider } from "react-intl"
import messages from "@/i18n/en.json"

export const renderWithProviders = (ui: ReactElement) =>
  render(<IntlProvider locale="en-US" messages={messages}>{ui}</IntlProvider>)