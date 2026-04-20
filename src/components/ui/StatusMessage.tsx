import { styled } from "@/styled-system/jsx"

export const StatusMessage = styled("p", {
  variants: {
    variant: {
      success: { color: "status.success.default" },
      error: { color: "status.error.default" },
      alert: { color: "status.alert.default" },
      info: { color: "neutrals.nLv2" },
    },
    size: {
      sm: { textStyle: "body.small" },
      md: { textStyle: "body.medium" },
      lg: { textStyle: "body.large" },
    },
  },
  defaultVariants: {
    size: "lg",
  },
})
