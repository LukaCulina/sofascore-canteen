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
      zIndex={9999}
      pointerEvents="none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </Flex>
  )
}
