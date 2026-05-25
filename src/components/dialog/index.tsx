import { type PropsWithChildren, useEffect } from "react"
import { Text } from "@/components/ui"
import Portal from "@/components/ui/Portal"
import { Box, Flex } from "@/styled-system/jsx"

interface DialogRootProps extends PropsWithChildren {
  onClose: () => void
  ariaLabelledBy?: string
  ariaDescribedBy?: string
}

const DialogRoot = ({ children, onClose, ariaLabelledBy, ariaDescribedBy }: DialogRootProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])
  return (
    <Portal>
      <Box
        position="fixed"
        inset={0}
        bg="overlay.darken2"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p="lg"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <Flex
          direction="column"
          bg="surface.s1"
          rounded="lg"
          w="full"
          maxW="420px"
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
        >
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
