import { motion } from "framer-motion"
import { useEffect } from "react"
import { IconCancel, IconCheckmark, IconError } from "@/components/icons"
import { Text } from "@/components/ui/Text"
import { type Toast, useToastStore } from "@/stores/toast"
import { Flex } from "@/styled-system/jsx"

interface ToastItemProps {
  toast: Toast
}

export const ToastItem = ({ toast }: ToastItemProps) => {
  const removeToast = useToastStore((state) => state.removeToast)
  const isSuccess = toast.type === "success"

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id)
    }, 5000)

    return () => clearTimeout(timer)
  }, [toast.id, removeToast])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ pointerEvents: "auto" }}
    >
      <Flex
        role="alert"
        align="center"
        w="320px"
        minH="4xl"
        gap="lg"
        px="lg"
        py="md"
        borderRadius="lg"
        bg="neutrals.nLv1"
        boxShadow="0px 4px 12px 0px token(colors.neutrals.nLv4)"
      >
        <Flex
          w="2xl"
          h="2xl"
          p="xs"
          borderRadius="xl"
          background={isSuccess ? "status.success.highlight" : "status.error.highlight"}
        >
          <Flex align="center" justify="center" w="xl" h="xl">
            {isSuccess ? (
              <IconCheckmark fill="status.success.default" />
            ) : (
              <IconError fill="status.error.default" />
            )}
          </Flex>
        </Flex>
        <Text flex="1" color="surface.s1">
          {toast.message}
        </Text>
        <button aria-label="Close notification" type="button" onClick={() => removeToast(toast.id)}>
          <Flex align="center" justify="center" w="xl" h="xl" cursor="pointer">
            <IconCancel fill="surface.s1" width="12" height="12" />
          </Flex>
        </button>
      </Flex>
    </motion.div>
  )
}
