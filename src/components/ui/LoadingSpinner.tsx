import { Flex, styled } from "@/styled-system/jsx"

const Spinner = styled("div", {
  base: {
    width: "4xl",
    height: "4xl",
    borderWidth: "6px",
    borderStyle: "solid",
    borderColor: "neutrals.nLv4",
    borderTopColor: "primary.default",
    borderRadius: "50%",
    animation: "rotation 0.8s linear infinite",
  },
})

export const LoadingSpinner = () => {
  return (
    <Flex justify="center" align="center" py="6xl">
      <Spinner />
    </Flex>
  )
}
