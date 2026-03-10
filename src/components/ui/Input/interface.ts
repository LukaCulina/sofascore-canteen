import type { BoxProps } from "@/styled-system/jsx"
import type { InputVariantProps } from "./Input.recipe"

type HTMLInputProps =
  | "autocomplete"
  | "disabled"
  | "max"
  | "maxLength"
  | "min"
  | "minLength"
  | "step"
  | "required"
  | "type"

export type InputProps<T = string> = {
  label?: React.ReactNode | string
  name?: string
  placeholder?: string
  style?: React.CSSProperties
  type?: "text" | "number" | "password" | "email" | "date"
  value?: T
  defaultValue?: T
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  onChange?: (value: T, event: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (value: T) => void
  onBlur?: (value: T, event: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> &
    React.KeyboardEventHandler<"input">
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>
  onClick?: React.MouseEventHandler<HTMLInputElement>
} & Omit<BoxProps, "onBlur" | "onChange" | "onFocus" | "onKeyDown"> &
  Partial<Pick<HTMLInputElement, HTMLInputProps>> &
  InputVariantProps &
  React.RefAttributes<HTMLInputElement>
