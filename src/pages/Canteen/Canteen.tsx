import { FormattedMessage, useIntl } from "react-intl"
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
        <StatusMessage variant="error">
          <FormattedMessage id="canteen.failedToLoadMealOptions" />
        </StatusMessage>
      </Flex>
    )

  return (
    <Flex direction="column" gap="xl">
      <Flex direction="column" gap="lg">
        <Text textStyle="display.extraLarge">
          <FormattedMessage
            id="canteen.weekOf"
            values={{
              start: formatTitleDate(data.plan.period_start),
              end: formatTitleDate(data.plan.period_end),
            }}
          />
        </Text>
        <Text textStyle="body.large">
          <FormattedMessage id="canteen.chooseMeals" />
        </Text>
      </Flex>

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
          submitLabel={
            isEditingOrder
              ? intl.formatMessage({ id: "canteen.saveChanges" })
              : intl.formatMessage({ id: "canteen.submit" })
          }
          onCancel={isEditingOrder ? closeEditMode : undefined}
          lockedDays={isEditingOrder ? lockedDays : undefined}
        />
      )}

      {isCancelDialogOpen && (
        <CancelOrderDialog
          isSubmitting={isDeleting}
          onConfirm={handleCancelOrder}
          onCancel={() => setIsCancelDialogOpen(false)}
        />
      )}

      {transferSelectionId !== null && (
        <TransferMealDialog
          users={users}
          isLoadingUsers={isLoadingUsers}
          hasUsersError={!!usersError}
          isTransferring={isTransferring}
          onConfirm={handleTransfer}
          onCancel={handleCancel}
        />
      )}
    </Flex>
  )
}
