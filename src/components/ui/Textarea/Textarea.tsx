import { forwardRef, type TextareaHTMLAttributes } from "react"
import { styled } from "@/styled-system/jsx"
import type { StyledComponent } from "@/styled-system/types"

export const StyledTextarea = styled("textarea", {
  base: {
    display: "block",
    w: "full",
    minHeight: "100px",
    px: "md",
    py: "sm",
    borderRadius: "sm",
    border: "1px solid",
    borderColor: "neutrals.nLv4",
    bg: "surface.s2",
    textStyle: "body.medium",
    color: "neutrals.nLv1",
    outline: "none",
    transition: "border {durations.faster}",
    resize: "vertical",
    fontFamily: "inherit",

    _placeholder: {
      color: "neutrals.nLv3",
      textStyle: "body.medium",
    },

    _hover: {
      borderColor: "neutrals.nLv3",
    },

    _focus: {
      borderColor: "primary.default",
      bg: "surface.s1",
    },

    _disabled: {
      bg: "neutrals.nLv4",
      color: "neutrals.nLv3",
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },
  variants: {
    size: {
      sm: {
        minHeight: "80px",
        px: "sm",
        py: "xs",
        textStyle: "body.medium",
      },
      md: {
        minHeight: "100px",
        px: "md",
        py: "sm",
      },
      lg: {
        minHeight: "140px",
        px: "lg",
        py: "md",
        textStyle: "body.large",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
}) as StyledComponent<"textarea">

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: "sm" | "md" | "lg"
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size = "sm", ...props }, ref) => {
    return <StyledTextarea ref={ref} {...props} />
  },
)

Textarea.displayName = "Textarea"
