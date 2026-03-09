import { styled } from "@/styled-system/jsx"

export const RadioWrap = styled("span", {
  base: {
    position: "relative",
    width: "24px",
    height: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& > input:checked + .radioIcon": {
      opacity: 1,
      transform: "scale(1)",
    },
  },
})

export const MealItemRadio = styled("input", {
  base: {
    height: "19px",
    width: "19px",
    cursor: "pointer",
    border: "2px solid token(colors.neutrals.nLv3)",
    borderRadius: "50%",
    backgroundColor: "token(colors.surface.s1)",

    appearance: "none",
    WebkitAppearance: "none",

    "&:checked": {
      borderColor: "token(colors.primary.default)",
      backgroundColor: "token(colors.primary.s1)",
    },
  },
})

export const RadioIcon = styled("span", {
  base: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    inset: 0,
    pointerEvents: "none",
    color: "token(colors.primary.default)",
    opacity: 0,
    transform: "scale(0.5)",
    transition: "opacity 0.15s ease, transform 0.15s ease",
  },
})

export const MealItem = styled("label", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "lg",
    padding: "lg",
    bg: "surface.s1",
    cursor: "pointer",

    "&.no-meal": {
      borderBottomLeftRadius: "lg",
      borderBottomRightRadius: "lg",
    },
  },
})

export const MealImage = styled("img", {
  base: {
    width: "57px",
    height: "32px",
    aspectRatio: "57 / 32",
    borderRadius: "sm",
    objectFit: "cover",
  },
})
