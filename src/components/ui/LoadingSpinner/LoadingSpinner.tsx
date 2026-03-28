import { css } from "@/styled-system/css"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
}

export const LoadingSpinner = ({ size = "md" }: LoadingSpinnerProps) => {
  const sizeValue = {
    sm: "16px",
    md: "24px",
    lg: "32px",
  }[size]

  const borderWidth = {
    sm: "2px",
    md: "3px",
    lg: "4px",
  }[size]

  return (
    <div
      className={css({
        width: sizeValue,
        height: sizeValue,
        border: `${borderWidth} solid`,
        borderColor: "neutrals.nLv4",
        borderTopColor: "primary.default",
        borderRadius: "50%",
        animationName: "rotation",
        animationDuration: "0.8s",
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
      })}
    />
  )
}
