import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { IntlProvider } from "react-intl"
import type { SWRResponse } from "swr"
import * as httpClient from "@/api/http-client"
import { Role, useAuthStore } from "@/stores/auth"
import type { Order } from "@/types/orders"
import { Orders } from "./Orders"

vi.mock("swr", () => ({
  default: vi.fn(),
}))

vi.mock("@/api/http-client", () => ({
  postJson: vi.fn(),
}))

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
}))

import useSWR from "swr"

const adminUser = { id: "1", email: "admin@test.com", role: Role.ADMIN }
const employeeUser = { id: "2", email: "employee@test.com", role: Role.EMPLOYEE }

const setAdmin = () =>
  useAuthStore.setState({ user: adminUser, token: "token", refreshToken: "refresh" })

const renderWithProviders = (component: React.ReactElement) =>
  render(<IntlProvider locale="en-US">{component}</IntlProvider>)

const mockOrders = [
  {
    id: 1,
    user: { name: "John", email: "john@example.com" },
    user_id: "123",
    plan_id: 1,
    status: "submitted",
    submitted_at: 1776360271,
    created_at: 1776360271,
    updated_at: 1776360271,
    plan: { id: 1, period_start: 1776038400, period_end: 1776470399 },
    order_selection: [
      {
        id: 10,
        order_id: 1,
        plan_day_id: 1,
        meal_id: 1,
        unpaid: false,
        created_at: 1776360271,
        meal: {
          id: 1,
          description: "Pasta",
          price: 10,
          discount: 0,
          is_vegetarian: false,
          image_url: "",
        },
        plan_day: { id: 1, day: 1776038400, planId: 1 },
      },
    ],
  },
]

const mockSWR = (overrides: Partial<SWRResponse<{ orders: Order[] }>> = {}) =>
  vi.mocked(useSWR).mockReturnValue({
    isLoading: false,
    data: { orders: mockOrders },
    error: undefined,
    mutate: vi.fn(),
    ...overrides,
  } as unknown as SWRResponse)

describe("Orders", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.setState({ user: null, token: null, refreshToken: null })
  })

  describe("data fetching states", () => {
    it("shows loading spinner", () => {
      mockSWR({ isLoading: true, data: undefined })
      setAdmin()

      renderWithProviders(<Orders />)

      expect(screen.getByRole("status")).toBeInTheDocument()
    })

    it("shows error if fetch fails", () => {
      mockSWR({ error: new Error("fail"), data: undefined })
      setAdmin()

      renderWithProviders(<Orders />)

      expect(screen.getByText("Failed to load orders")).toBeInTheDocument()
    })

    it("shows empty state if no orders exist", () => {
      mockSWR({ data: { orders: [] } })
      setAdmin()

      renderWithProviders(<Orders />)

      expect(screen.getByText("No orders found")).toBeInTheDocument()
    })
  })

  describe("role restrictions", () => {
    it("admin sees Edit Payment Status button", () => {
      mockSWR()
      setAdmin()

      renderWithProviders(<Orders />)

      expect(screen.getByText("Edit Payment Status")).toBeInTheDocument()
    })

    it("employee does not see Edit Payment Status button", () => {
      mockSWR()
      useAuthStore.setState({ user: employeeUser, token: "token", refreshToken: "refresh" })

      renderWithProviders(<Orders />)

      expect(screen.queryByText("Edit Payment Status")).not.toBeInTheDocument()
    })
  })

  describe("editing payment status", () => {
    it("clicking Edit shows Save and Cancel buttons", async () => {
      const user = userEvent.setup()
      mockSWR()
      setAdmin()

      renderWithProviders(<Orders />)

      await user.click(screen.getByText("Edit Payment Status"))

      expect(screen.getByText("Save Changes")).toBeInTheDocument()
      expect(screen.getByText("Cancel")).toBeInTheDocument()
    })

    it("Save is disabled without changes", async () => {
      const user = userEvent.setup()
      mockSWR()
      setAdmin()

      renderWithProviders(<Orders />)

      await user.click(screen.getByText("Edit Payment Status"))

      expect(screen.getByText("Save Changes").closest("button")).toBeDisabled()
    })

    it("Cancel resets edit mode", async () => {
      const user = userEvent.setup()
      mockSWR()
      setAdmin()

      renderWithProviders(<Orders />)

      await user.click(screen.getByText("Edit Payment Status"))
      await user.click(screen.getByText("Cancel"))

      expect(screen.getByText("Edit Payment Status")).toBeInTheDocument()
      expect(screen.queryByText("Save Changes")).not.toBeInTheDocument()
    })

    it("Save is disabled while request is in progress", async () => {
      const user = userEvent.setup()
      mockSWR()
      vi.mocked(httpClient.postJson).mockReturnValueOnce(new Promise(() => {}))
      setAdmin()

      renderWithProviders(<Orders />)

      await user.click(screen.getByText("Edit Payment Status"))
      await user.click(screen.getByTestId("order-row-1"))
      await user.click(screen.getByText("Save Changes"))

      await waitFor(() => {
        expect(screen.getByText("Save Changes").closest("button")).toBeDisabled()
      })
    })
  })

  describe("saving changes", () => {
    it("successful save calls API and resets state", async () => {
      const user = userEvent.setup()
      const mutate = vi.fn()
      mockSWR({ mutate })

      vi.mocked(httpClient.postJson).mockResolvedValueOnce({ success: true })
      setAdmin()

      renderWithProviders(<Orders />)

      await user.click(screen.getByText("Edit Payment Status"))
      await user.click(screen.getByTestId("order-row-1"))
      await user.click(screen.getByText("Save Changes"))

      await waitFor(() => {
        expect(httpClient.postJson).toHaveBeenCalledWith(expect.any(String), {
          updates: [{ id: 10, unpaid: true }],
        })
        expect(mutate).toHaveBeenCalled()
        expect(screen.getByText("Edit Payment Status")).toBeInTheDocument()
      })
    })

    it("failed save shows error message", async () => {
      const user = userEvent.setup()
      mockSWR()
      vi.mocked(httpClient.postJson).mockRejectedValueOnce(new Error("fail"))
      setAdmin()

      renderWithProviders(<Orders />)

      await user.click(screen.getByText("Edit Payment Status"))
      await user.click(screen.getByTestId("order-row-1"))
      await user.click(screen.getByText("Save Changes"))

      await waitFor(() => {
        expect(screen.getByText("Failed to update payment status")).toBeInTheDocument()
      })
    })

    it("Cancel clears save error", async () => {
      const user = userEvent.setup()
      mockSWR()
      vi.mocked(httpClient.postJson).mockRejectedValueOnce(new Error("fail"))
      setAdmin()

      renderWithProviders(<Orders />)

      await user.click(screen.getByText("Edit Payment Status"))
      await user.click(screen.getByTestId("order-row-1"))
      await user.click(screen.getByText("Save Changes"))

      await waitFor(() => {
        expect(screen.getByText("Failed to update payment status")).toBeInTheDocument()
      })

      await user.click(screen.getByText("Cancel"))

      expect(screen.queryByText("Failed to update payment status")).not.toBeInTheDocument()
    })
  })
})
