import { styled } from "@/styled-system/jsx"

export const Button = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "sm",
    borderRadius: "sm",
    px: "lg",
    py: "sm",
    textStyle: "label.medium",
    cursor: "pointer",
    w: "full",
    border: "1px solid transparent",
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "primary.default",
      outlineOffset: "2px",
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "primary.default",
        color: "surface.s1",
        _hover: { opacity: 0.9 },
        _disabled: {
          bg: "neutrals.nLv3",
        },
      },
      outline: {
        bg: "transparent",
        borderColor: "primary.highlight",
        color: "primary.default",
        _hover: { bg: "primary.highlight" },
      },
      error: {
        bg: "status.error.highlight",
        color: "status.error.default",
        textStyle: "assistive.default",
        borderRadius: "lg",
        px: "sm",
        py: "xs",
        w: "fit-content",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})
