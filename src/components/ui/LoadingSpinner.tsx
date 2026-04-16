import { Flex, styled } from "@/styled-system/jsx"

type LoadingSpinnerProps = {
  size?: "sm" | "md" | "lg"
  fullPage?: boolean
}

export const Spinner = styled("div", {
  base: {
    borderStyle: "solid",
    borderColor: "neutrals.nLv4",
    borderTopColor: "primary.default",
    borderRadius: "50%",
    animation: "rotation 0.8s linear infinite",
  },
  variants: {
    size: {
      sm: { width: "md", height: "md", borderWidth: "thin" },
      md: { width: "lg", height: "lg", borderWidth: "thick" },
      lg: { width: "4xl", height: "4xl", borderWidth: "heavy" },
    },
  },
  defaultVariants: {
    size: "lg",
  },
})

export const LoadingSpinner = ({ size = "lg", fullPage = true }: LoadingSpinnerProps) => {
  const spinner = <Spinner size={size} />

  if (!fullPage) return spinner

  return (
    <Flex justify="center" align="center" py="6xl">
      {spinner}
    </Flex>
  )
}
