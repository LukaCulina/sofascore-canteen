import { styled } from "@/styled-system/jsx"

export const Badge = styled("span", {
  base: {
    bg: "status.error.highlight",
    color: "status.error.default",
    textStyle: "assistive.default",
    border: "1px solid transparent",
    borderRadius: "xl",
    px: "sm",
    py: "xs",
    w: "fit-content",
  },
})
