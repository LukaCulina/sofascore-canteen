import { styled } from "@/styled-system/jsx"

export const Header = styled("header", {
  base: {
    bg: "surface.s1",
    borderBottom: "1px solid",
    borderColor: "neutrals.nLv4",
    px: "xl",
    py: "xl",
    display: "flex",
    justifyContent: { base: "space-between", md: "flex-end" },
    alignItems: "center",
  },
})

export const InitialsContainer = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: "sm",
    borderRadius: "xl",
    bg: "primary.highlight",
    color: "primary.default",
    textStyle: "display.large",
    width: "40px",
    height: "40px",
  },
})

export const HamburgerButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bg: "transparent",
    border: "none",
    cursor: "pointer",
    p: "xs",
    borderRadius: "sm",
    color: "neutrals.nLv1",
    md: { display: "none" },

    _hover: {
      bg: "primary.highlight",
    },
  },
})
