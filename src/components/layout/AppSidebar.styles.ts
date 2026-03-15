import { css } from "@/styled-system/css"
import { styled } from "@/styled-system/jsx"

export const SidebarNavigation = styled("nav", {
  base: {
    width: "260px",
    flexShrink: 0,
    bg: "surface.s1",
    boxShadow: "inset -1px 0 0 0 token(colors.neutrals.nLv4)",
    display: "flex",
    flexDirection: "column",
    height: "100dvh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 50,
    transform: "translateX(-100%)",
    transition: "transform 0.2s ease",
    md: {
      position: "sticky",
      transform: "none",
      zIndex: "auto",
    },
    "&[data-open='true']": {
      transform: "translateX(0)",
    },
  },
})

export const Backdrop = styled("div", {
  base: {
    position: "fixed",
    inset: 0,
    bg: "rgba(0, 0, 0, 0.4)",
    zIndex: 49,
    md: {
      display: "none",
    },
  },
})

export const SidebarNavigationList = styled("ul", {
  base: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "sm",
  },
})

export const navItemStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  px: "lg",
  py: "sm",
  borderRadius: "sm",
  textStyle: "display.small",
  color: "neutrals.nLv1",
  textDecoration: "none",
  cursor: "pointer",
  _hover: {
    bg: "primary.highlight",
  },
})

export const navItemActiveStyle = css({
  "&": {
    color: "primary.default",
    bg: "primary.highlight",
  },
})
