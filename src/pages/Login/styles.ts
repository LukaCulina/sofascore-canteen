import { styled } from "@/styled-system/jsx"

export const Header = styled("header", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    px: "lg",
    py: "xl",
    gap: "lg",
  },
})

export const LabelGroup = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "xs",
  },
})

export const Form = styled("form", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "lg",
    px: "lg",
    pt: "lg",
    w: "full",
  },
})

export const Footer = styled("footer", {
  base: {
    px: "lg",
    py: "xl",
    textStyle: "body.medium",
    color: "neutrals.nLv1",
    textAlign: "center",
  },
})
