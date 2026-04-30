import { styled } from "@/styled-system/jsx"

export const Label = styled("label", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "sm",
    cursor: "pointer",
  },
})

export const Checkbox = styled("input", {
  base: {
    h: "lg",
    w: "lg",
    accentColor: "primary.default",
    cursor: "pointer",
  },
})
