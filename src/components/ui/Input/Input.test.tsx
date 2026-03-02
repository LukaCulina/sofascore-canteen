import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Input } from "./Input"

describe("Input", () => {
  it("renders with a label", () => {
    render(<Input label="Email" name="email" />)

    expect(screen.getByLabelText("email")).toBeInTheDocument()
    expect(screen.getByText("Email")).toBeInTheDocument()
  })

  it("renders with a placeholder", () => {
    render(<Input placeholder="Enter text" name="field" />)

    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument()
  })

  it("calls onChange when typing", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<Input label="Name" name="name" onChange={handleChange} />)

    const input = screen.getByLabelText("name")
    await user.type(input, "hello")

    expect(handleChange).toHaveBeenCalledTimes(5)
    expect(handleChange).toHaveBeenLastCalledWith("hello", expect.any(Object))
  })

  it("calls onFocus and onBlur", async () => {
    const user = userEvent.setup()
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()

    render(
      <Input label="Field" name="field" onFocus={handleFocus} onBlur={handleBlur} />,
    )

    const input = screen.getByLabelText("field")

    await user.click(input)
    expect(handleFocus).toHaveBeenCalledTimes(1)

    await user.tab()
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it("displays the controlled value", () => {
    render(<Input label="Email" name="email" value="test@example.com" />)

    expect(screen.getByLabelText("email")).toHaveValue("test@example.com")
  })

  it("shows required indicator when required", () => {
    render(<Input label="Email" name="email" required />)

    expect(screen.getByText(/\*/)).toBeInTheDocument()
  })

  it("disables the input when disabled prop is passed", () => {
    render(<Input label="Email" name="email" disabled />)

    expect(screen.getByLabelText("email")).toBeDisabled()
  })

  it("renders start and end adornments", () => {
    render(
      <Input
        label="Search"
        name="search"
        startAdornment={<span data-testid="start">S</span>}
        endAdornment={<span data-testid="end">E</span>}
      />,
    )

    expect(screen.getByTestId("start")).toBeInTheDocument()
    expect(screen.getByTestId("end")).toBeInTheDocument()
  })

  it("does not render end adornment when disabled", () => {
    render(
      <Input
        label="Search"
        name="search"
        disabled
        endAdornment={<span data-testid="end">E</span>}
      />,
    )

    expect(screen.queryByTestId("end")).not.toBeInTheDocument()
  })
})
