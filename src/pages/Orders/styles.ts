import { styled } from "@/styled-system/jsx"

export const Table = styled("table", {
  base: {
    width: "100%",
    border: "1px solid",
    borderColor: "neutrals.nLv4",
    borderRadius: "lg",
    minWidth: "800px",
    tableLayout: "fixed",
    borderCollapse: "collapse",
    overflow: "hidden",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  },
})

export const Tr = styled("tr", {
  base: {
    backgroundColor: "surface.s1",
    borderBottom: "1px solid",
    borderColor: "neutrals.nLv4",
  },
})

export const Th = styled("th", {
  base: {
    textStyle: "assistive.default",
    color: "neutrals.nLv3",
    px: "lg",
    py: "md",
    textAlign: "left",
  },
})

export const Td = styled("td", {
  base: {
    textStyle: "body.small",
    px: "lg",
    py: "md",
  },
})

export const GreyText = styled("span", {
  base: {
    textStyle: "assistive.default",
    color: "neutrals.nLv3",
  },
})
