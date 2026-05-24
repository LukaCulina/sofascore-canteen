import { styled } from "@/styled-system/jsx"

export const Table = styled("table", {
  base: {
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "collapse",
  },
})

export const Tr = styled("tr", {
  base: {
    h: "4xl",
    borderBottom: "1px solid",
    borderColor: "neutrals.nLv4",
  },
})

export const Th = styled("th", {
  base: {
    px: "lg",
    py: "md",
    textStyle: "assistive.default",
    color: "neutrals.nLv3",
    textAlign: "left",
  },
})

export const Td = styled("td", {
  base: {
    px: "lg",
    py: "md",
    textStyle: "body.small",
    color: "neutrals.nLv1",
  },
})

export const GreyText = styled("span", {
  base: {
    textStyle: "assistive.default",
    color: "neutrals.nLv3",
  },
})
