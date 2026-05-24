import { styled } from "@/styled-system/jsx"

export const Badge = styled("span", {
  base: {
    px: "sm",
    py: "xs",
    textAlign: "center",
    whiteSpace: "nowrap",
    bg: "status.error.highlight",
    color: "status.error.default",
    textStyle: "assistive.default",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: "xl",
  },
})
