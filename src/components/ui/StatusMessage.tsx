import type { ReactNode } from "react"
import { Flex, styled } from "@/styled-system/jsx"

type StatusMessageProps = {
  children: ReactNode
  variant: "success" | "error" | "alert" | "info"
  inline?: boolean
}

const Message = styled("p", {
  base: {},
  variants: {
    variant: {
      success: { color: "status.success.default" },
      error: { color: "status.error.default" },
      alert: { color: "status.alert.default" },
      info: { color: "neutrals.nLv2" },
    },
    inline: {
      true: { textStyle: "body.medium" },
      false: { textStyle: "display.medium" },
    },
  },
})

export const StatusMessage = ({ children, variant, inline = false }: StatusMessageProps) => {
  const message = (
    <Message variant={variant} inline={inline}>
      {children}
    </Message>
  )

  if (inline) return message

  return (
    <Flex justify="center" align="center" py="6xl">
      {message}
    </Flex>
  )
}
