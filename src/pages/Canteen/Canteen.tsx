import { useIntl } from "react-intl"
import useSWR from "swr"
import { getJson } from "@/api/http-client.ts"
import { order } from "@/api/routes.ts"
import { Spinner, StatusMessage } from "@/components/ui"
import { Text } from "@/components/ui/Text"
import { MealSelectionForm } from "@/pages/Canteen/components/MealSelection"
import { useAuthStore } from "@/stores/auth"
import { Flex } from "@/styled-system/jsx"
import type { MealOptions } from "@/types"
import { SummaryCard } from "./components/SummaryCard"
import { CancelOrderDialog, TransferMealDialog } from "./dialogs"
import { useOrderActions, useTransfer } from "./hooks"

export const CanteenPage = () => {
  const { token } = useAuthStore()
  const { data, error, isLoading, mutate } = useSWR<MealOptions>(
    token ? order() : null,
    (url: string) => getJson<MealOptions>(url),
  )

  const intl = useIntl()

  const {
    isEditingOrder,
    isCancelDialogOpen,
    setIsCancelDialogOpen,
    actionError,
    editSelectionsSnapshot,
    isCreating,
    isUpdating,
    isDeleting,
    openEditMode,
    closeEditMode,
    handleSubmit,
    handleCancelOrder,
    lockedDays,
  } = useOrderActions(token, data, mutate)

  const {
    transferSelectionId,
    setTransferSelectionId,
    users,
    isLoadingUsers,
    usersError,
    isTransferring,
    transferError,
    handleTransfer,
    handleCancel,
  } = useTransfer(token, mutate)

  const formatTitleDate = (unixTime: number) =>
    intl.formatDate(new Date(unixTime * 1000), { month: "short", day: "numeric" })

  if (isLoading) {
    return (
      <Flex justify="center" align="center" py="6xl">
        <Spinner />
      </Flex>
    )
  }

  if (error || !data)
    return (
      <Flex justify="center" align="center" py="6xl">
        <StatusMessage variant="error">Failed to load meal options</StatusMessage>
      </Flex>
    )

  return (
    <Flex direction="column" gap="xl">
      <Flex direction="column" gap="lg">
        <Text textStyle="display.extraLarge">
          {`Week of ${formatTitleDate(data.plan.period_start)} - ${formatTitleDate(data.plan.period_end)}`}
        </Text>
        <Text textStyle="body.large">Choose your meals for the upcoming work week.</Text>
      </Flex>

      {actionError ? <StatusMessage variant="error">{actionError}</StatusMessage> : null}

      {data.order && !isEditingOrder ? (
        <SummaryCard
          order={data.order}
          onEdit={openEditMode}
          onCancelOrder={() => {
            setIsCancelDialogOpen(true)
          }}
          onTransferMeal={setTransferSelectionId}
          isDeleting={isDeleting}
        />
      ) : (
        <MealSelectionForm
          plan={data.plan}
          initialSelections={isEditingOrder ? editSelectionsSnapshot : undefined}
          onSubmit={handleSubmit}
          isSubmitting={isCreating || isUpdating}
          submitLabel={isEditingOrder ? "Save changes" : "Submit"}
          onCancel={isEditingOrder ? closeEditMode : undefined}
          lockedDays={isEditingOrder ? lockedDays : undefined}
        />
      )}

      <CancelOrderDialog
        isOpen={isCancelDialogOpen}
        isSubmitting={isDeleting}
        onConfirm={handleCancelOrder}
        onCancel={() => setIsCancelDialogOpen(false)}
      />

      <TransferMealDialog
        key={transferSelectionId ?? "closed"}
        isOpen={transferSelectionId !== null}
        users={users}
        isLoadingUsers={isLoadingUsers}
        hasUsersError={!!usersError}
        isTransferring={isTransferring}
        hasTransferError={!!transferError}
        onConfirm={handleTransfer}
        onCancel={handleCancel}
      />
    </Flex>
  )
}
