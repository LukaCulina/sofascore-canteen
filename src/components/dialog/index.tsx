import type { PropsWithChildren } from "react"
import { Text } from "@/components/ui"
import Portal from "@/components/ui/Portal"
import { Box, Flex } from "@/styled-system/jsx"

const DialogRoot = ({ children }: PropsWithChildren) => {
  return (
    <Portal>
      <Box
        position="fixed"
        inset={0}
        bg="rgba(0, 0, 0, 0.45)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p="lg"
      >
        <Flex direction="column" bg="surface.s1" rounded="lg" w="full" maxW="420px">
          {children}
        </Flex>
      </Box>
    </Portal>
  )
}

const DialogHeader = ({ children }: PropsWithChildren) => {
  return (
    <Flex px="lg" py="xl" borderBottomWidth="thin" borderBottomColor="neutrals.nLv4">
      {children}
    </Flex>
  )
}

const DialogTitle = ({ children }: PropsWithChildren) => {
  return <Text textStyle="display.large">{children}</Text>
}

const DialogContent = ({ children }: PropsWithChildren) => {
  return <Box p="lg">{children}</Box>
}

const DialogFooter = ({ children }: PropsWithChildren) => {
  return (
    <Box p="lg" borderTopWidth="thin" borderTopColor="neutrals.nLv4">
      {children}
    </Box>
  )
}

export const Dialog = {
  Root: DialogRoot,
  Header: DialogHeader,
  Title: DialogTitle,
  Content: DialogContent,
  Footer: DialogFooter,
}
