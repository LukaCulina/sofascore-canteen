import { useState } from "react"
import { Dialog } from "@/components/dialog"
import { Select, Spinner, Text } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { Flex } from "@/styled-system/jsx"
import type { User } from "@/types"

interface TransferMealDialogProps {
  isOpen: boolean
  users: User[]
  isLoadingUsers: boolean
  isTransferring: boolean
  error: boolean
  onConfirm: (userId: string) => void
  onCancel: () => void
}

export function TransferMealDialog({
  isOpen,
  users,
  isLoadingUsers,
  isTransferring,
  error,
  onConfirm,
  onCancel,
}: Readonly<TransferMealDialogProps>) {
  const [selectedUserId, setSelectedUserId] = useState("")

  if (!isOpen) return null

  return (
    <Dialog.Root onClose={isTransferring ? () => {} : onCancel}>
      <Dialog.Header>
        <Dialog.Title>Transfer meal</Dialog.Title>
      </Dialog.Header>

      <Dialog.Content>
        <Flex direction="column" gap="md">
          <Text textStyle="display.small">Who should receive your meal?</Text>

          {isLoadingUsers ? (
            <Flex justify="center" py="md">
              <Spinner size="sm" />
            </Flex>
          ) : (
            <Select
              id="user-select"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              disabled={isTransferring}
            >
              <option value="" disabled>
                Select an employee...
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} {user.surname}
                </option>
              ))}
            </Select>
          )}

          {error ? (
            <Text textStyle="assistive.default" color="status.error.default">
              Something went wrong. Please try again.
            </Text>
          ) : null}
        </Flex>
      </Dialog.Content>

      <Dialog.Footer>
        <Flex gap="md" justifyContent="flex-end">
          <Button variant="outline" onClick={onCancel} disabled={isTransferring}>
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={() => onConfirm(selectedUserId)}
            disabled={!selectedUserId || isTransferring}
          >
            {isTransferring ? (
              <Flex gap="sm" alignItems="center">
                <Spinner size="sm" />
                Transferring...
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
