import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import * as httpClient from "@/api/http-client"
import { useAuthStore } from "@/stores/auth"

import { Login } from "./Login"

// Mock TanStack Router
const mockNavigate = vi.fn()
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => mockNavigate,
}))

// Mock http-client
vi.mock("@/api/http-client", () => ({
  postJson: vi.fn(),
}))

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuthStore.setState({ user: null, token: null, refreshToken: null })
  })

  it("renders the login form", () => {
    render(<Login />)

    expect(screen.getByText("Welcome to Canteen")).toBeInTheDocument()
    expect(screen.getByText("Sign in to order your meals")).toBeInTheDocument()
    expect(screen.getByText(/^Email/)).toBeInTheDocument()
    expect(screen.getByText(/^Password/)).toBeInTheDocument()
    expect(screen.getByText("Sign In")).toBeInTheDocument()
  })

  it("renders the Google sign-in button", () => {
    render(<Login />)

    expect(screen.getByText("Google")).toBeInTheDocument()
  })

  it("renders the footer with legal links", () => {
    render(<Login />)

    expect(screen.getByText("Terms of Service")).toBeInTheDocument()
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument()
  })

  it("updates email and password fields on input", async () => {
    const user = userEvent.setup()
    render(<Login />)

    const emailInput = screen.getByLabelText("email")
    const passwordInput = screen.getByLabelText("password")

    await user.type(emailInput, "user@test.com")
    await user.type(passwordInput, "secret123")

    expect(emailInput).toHaveValue("user@test.com")
    expect(passwordInput).toHaveValue("secret123")
  })

  it("calls the login API and navigates on success", async () => {
    const user = userEvent.setup()

    const mockResponse = {
      user: { id: "1", email: "user@test.com", role: "employee" },
      token: "token-abc",
      refreshToken: "refresh-xyz",
    }

    vi.mocked(httpClient.postJson).mockResolvedValueOnce(mockResponse)

    render(<Login />)

    await user.type(screen.getByLabelText("email"), "user@test.com")
    await user.type(screen.getByLabelText("password"), "secret123")
    await user.click(screen.getByText("Sign In"))

    await waitFor(() => {
      expect(httpClient.postJson).toHaveBeenCalledWith("/auth/login", {
        email: "user@test.com",
        password: "secret123",
      })
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/" })
    })
  })

  it("disables the sign-in button while submitting", async () => {
    const user = userEvent.setup()

    // Never-resolving promise to keep the button disabled
    vi.mocked(httpClient.postJson).mockReturnValueOnce(new Promise(() => {}))

    render(<Login />)

    const signInButton = screen.getByText("Sign In").closest("button")!

    await user.type(screen.getByLabelText("email"), "a@b.com")
    await user.type(screen.getByLabelText("password"), "pass")
    await user.click(signInButton)

    await waitFor(() => {
      expect(signInButton).toBeDisabled()
    })
  })
})