import { Dialog } from "@/components/dialog"
import { Spinner, Text } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { Flex } from "@/styled-system/jsx"

interface CancelOrderDialogProps {
  isSubmitting?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function CancelOrderDialog({
  isSubmitting = false,
  onConfirm,
  onCancel,
}: Readonly<CancelOrderDialogProps>) {
  return (
    <Dialog.Root onClose={isSubmitting ? () => {} : onCancel}>
      <Dialog.Header>
        <Dialog.Title>Cancel order</Dialog.Title>
      </Dialog.Header>
      <Dialog.Content>
        <Text textStyle="display.small">Are you sure you want to cancel your order?</Text>
      </Dialog.Content>
      <Dialog.Footer>
        <Flex gap="md" justifyContent="flex-end">
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting} minW="fit-content">
            Cancel
          </Button>
          <Button variant="error" onClick={onConfirm} disabled={isSubmitting} minW="fit-content">
            {isSubmitting ? (
              <Flex alignItems="center" gap="sm">
                <Spinner size="sm" />
                Cancelling...
              </Flex>
            ) : (
              "Confirm"
            )}
          </Button>
        </Flex>
      </Dialog.Footer>
    </Dialog.Root>
  )
}
