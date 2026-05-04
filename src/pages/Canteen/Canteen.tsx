import { useState } from "react"
import { useIntl } from "react-intl"
import useSWR from "swr"
import { getJson } from "@/api/http-client.ts"
import { order } from "@/api/routes.ts"
import { Spinner, StatusMessage } from "@/components/ui"
import { Text } from "@/components/ui/Text"
import { CancelOrderDialog } from "@/pages/Canteen/components/CancelOrderDialog.tsx"
import { MealSelectionForm } from "@/pages/Canteen/components/MealSelection"
import { SummaryCard } from "@/pages/Canteen/components/SummaryCard"
import { useInitialOrderSelections } from "@/pages/Canteen/hooks/useInitialOrderSelections.ts"
import { useAuthStore } from "@/stores/auth"
import { Flex } from "@/styled-system/jsx"
import type { MealOptions } from "@/types"
import { useOrderActions } from "./hooks/useOrderActions"
import { useTransfer } from "./hooks/useTransfer"

export const CanteenPage = () => {
  const { token } = useAuthStore()
  const { data, error, isLoading, mutate } = useSWR<MealOptions>(
    token ? order() : null,
    (url: string) => getJson<MealOptions>(url),
  )

  const [isEditingOrder, setIsEditingOrder] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const [editSelectionsSnapshot, setEditSelectionsSnapshot] = useState<
    Record<number, number | null> | undefined
  >(undefined)
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
  } = useOrderActions(token, data, mutate)

  const {
    transferSelectionId,
    setTransferSelectionId,
    users,
    isLoadingUsers,
    isTransferring,
    transferError,
    handleTransfer,
  } = useTransfer(token, mutate)

  const formatTitleDate = (unixTime: number) =>
    intl.formatDate(new Date(unixTime * 1000), { month: "short", day: "numeric" })

  const closeEditMode = () => {
    setIsEditingOrder(false)
    setEditSelectionsSnapshot(undefined)
  }

  const openEditMode = () => {
    setActionError(null)
    setEditSelectionsSnapshot(initialSelections)
    setIsEditingOrder(true)
  }

  const handleSubmit = async (selections: Record<number, number | null>) => {
    if (!data?.plan) return

    setActionError(null)

    const payload: SaveOrderPayload = {
      planId: data.plan.id,
      isDraft: false,
      selections,
    }

    try {
      if (isEditingOrder) {
        await updateOrder(payload)
        await mutate()
        closeEditMode()
        return
      }

      await createOrder(payload)
      await mutate()
    } catch {
      setActionError("Something went wrong. Please try again.")
    }
  }

  const handleCancelOrder = async () => {
    if (!data?.order) {
      setIsCancelDialogOpen(false)
      return
    }

    setActionError(null)

    try {
      await cancelOrder()
      await mutate()
      setIsCancelDialogOpen(false)
      closeEditMode()
    } catch {
      setActionError("Something went wrong. Please try again.")
    }
  }

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
            setActionError(null)
            setIsCancelDialogOpen(true)
          }}
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
        />
      )}

      <CancelOrderDialog
        isOpen={isCancelDialogOpen}
        isSubmitting={isDeleting}
        onConfirm={handleCancelOrder}
        onCancel={() => setIsCancelDialogOpen(false)}
      />
    </Flex>
  )
}
