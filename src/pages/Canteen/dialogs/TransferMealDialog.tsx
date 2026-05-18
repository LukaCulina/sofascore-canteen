import { useMemo, useState } from "react"
import { Dialog } from "@/components/dialog"
import { Spinner, StatusMessage, Text } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { SearchBar } from "@/components/ui/SearchBar"
import { Flex } from "@/styled-system/jsx"
import type { User } from "@/types"

interface TransferMealDialogProps {
  users: User[]
  isLoadingUsers: boolean
  hasUsersError: boolean
  isTransferring: boolean
  hasTransferError: boolean
  onConfirm: (userId: string) => void
  onCancel: () => void
}

export function TransferMealDialog({
  users,
  isLoadingUsers,
  hasUsersError,
  isTransferring,
  hasTransferError,
  onConfirm,
  onCancel,
}: Readonly<TransferMealDialogProps>) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const items = useMemo(
    () =>
      users.map((user) => ({
        id: user.id,
        label: `${user.name} ${user.surname}`,
      })),
    [users],
  )

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
          ) : hasUsersError ? (
            <StatusMessage variant="error">
              Failed to load employees. Please try again.
            </StatusMessage>
          ) : (
            <SearchBar
              items={items}
              value={
                selectedUser
                  ? {
                      id: selectedUser.id,
                      label: `${selectedUser.name} ${selectedUser.surname}`,
                    }
                  : null
              }
              placeholder="Search employees"
              onChange={(item) => {
                const user = users.find((u) => u.id === item?.id)
                setSelectedUser(user || null)
              }}
            />
          )}

          {hasTransferError ? (
            <StatusMessage variant="error">Something went wrong. Please try again.</StatusMessage>
          ) : null}
        </Flex>
      </Dialog.Content>

      <Dialog.Footer>
        <Flex justifyContent="flex-end" gap="md">
          <Button variant="outline" onClick={onCancel} disabled={isTransferring}>
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={() => selectedUser && onConfirm(selectedUser.id)}
            disabled={!selectedUser || isTransferring}
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
