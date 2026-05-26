import { styled } from "@/styled-system/jsx"

export const TableWrapper = styled("div", {
  base: {
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "neutrals.nLv4",
    borderRadius: "lg",
    overflow: "hidden",
  },
})

export const TableContainer = styled("div", {
  base: {
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar-button": {
      display: "none",
    },
    "&::-webkit-scrollbar": {
      height: "8px",
      width: "8px",
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
      borderRadius: "lg",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "neutrals.nLv4",
      borderRadius: "lg",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "surface.s1",
      backgroundClip: "padding-box",
      "&:hover": {
        backgroundColor: "neutrals.nLv3",
      },
    },
  },
})

export const Table = styled("table", {
  base: {
    width: "100%",
    minW: "1000px",
    tableLayout: "fixed",
    borderCollapse: "collapse",
  },
})

export const Tr = styled("tr", {
  base: {
    h: "4xl",
    borderBottomWidth: "thin",
    borderBottomStyle: "solid",
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
