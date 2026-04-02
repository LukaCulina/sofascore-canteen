import { styled } from "@/styled-system/jsx"

export const Spinner = styled("div", {
  base: {
    width: "4xl",
    height: "4xl",
    borderWidth: "7px",
    borderStyle: "solid",
    borderColor: "neutrals.nLv4",
    borderTopColor: "primary.default",
    borderRadius: "50%",
    animation: "rotation 0.8s linear infinite",
  },
})
