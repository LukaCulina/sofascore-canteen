import { styled } from "@/styled-system/jsx"

export const Text = styled("span", {
  base: {
    textStyle: "body.medium",
    color: "neutrals.nLv1",
  },
})

export const H1 = styled("h1", {
  base: {
    textStyle: "display.extraLarge",
    color: "neutrals.nLv1",
    margin: "0",
  },
})

export const P = styled("p", {
  base: {
    textStyle: "body.mediumParagraph",
    color: "neutrals.nLv1",
  },
})

export const Anchor = styled("a", {
  base: {
    textStyle: "body.medium",
    textDecoration: "underline",
    color: "primary.default",
    cursor: "pointer",
    _hover: {
      opacity: 0.7,
    },
  },
})
