import { useToastStore } from "@/stores/toast"
import { Flex } from "@/styled-system/jsx"
import { ToastItem } from "./ToastItem"

export const ToastContainer = () => {
  const toasts = useToastStore((state) => state.toasts)

  return (
    <Flex
      direction="column"
      gap="xs"
      position="fixed"
      bottom="sm"
      right="sm"
      zIndex={9999}
      pointerEvents="none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </Flex>
  )
}
