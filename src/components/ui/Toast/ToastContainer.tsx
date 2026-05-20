import { AnimatePresence } from "framer-motion"
import { useToastStore } from "@/stores/toast"
import { Flex } from "@/styled-system/jsx"
import { ToastItem } from "./ToastItem"

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts)

  return (
    <Flex
      direction="column"
      gap="md"
      position="fixed"
      bottom="lg"
      right="lg"
      zIndex="toast"
      pointerEvents="none"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </Flex>
  )
}
