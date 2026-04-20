import { useState } from "react"
import { useIntl } from "react-intl"
import { order, orderByPlanId } from "@/api/routes.ts"
import { Spinner, StatusMessage } from "@/components/ui"
import { Text } from "@/components/ui/Text"
import { useAuthSWR } from "@/hooks/useAuthSWR.ts"
import { useAuthSWRMutation } from "@/hooks/useAuthSWRMutation.ts"
import { CancelOrderDialog } from "@/pages/Canteen/components/CancelOrderDialog.tsx"
import { MealSelectionForm } from "@/pages/Canteen/components/MealSelection"
import { SummaryCard } from "@/pages/Canteen/components/SummaryCard"
import { useInitialOrderSelections } from "@/pages/Canteen/hooks/useInitialOrderSelections.ts"
import { Flex } from "@/styled-system/jsx"
import type { MealOptions } from "@/types"

interface SaveOrderPayload {
  planId: number
  isDraft: boolean
  selections: Record<number, number | null>
}

interface SaveOrderResponse {
  success: boolean
  orderId: number
  message: string
}

export const CanteenPage = () => {
  const { data, error, isLoading, mutate } = useAuthSWR<MealOptions>(order())
  const [isEditingOrder, setIsEditingOrder] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const [editSelectionsSnapshot, setEditSelectionsSnapshot] = useState<
    Record<number, number | null> | undefined
  >(undefined)
  const intl = useIntl()

  const initialSelections = useInitialOrderSelections(data)

  const { trigger: createOrder, isMutating: isCreating } = useAuthSWRMutation<
    SaveOrderPayload,
    SaveOrderResponse
  >(order(), "POST")

  const { trigger: updateOrder, isMutating: isUpdating } = useAuthSWRMutation<
    SaveOrderPayload,
    SaveOrderResponse
  >(order(), "PUT")

  const { trigger: cancelOrder, isMutating: isDeleting } = useAuthSWRMutation<
    undefined,
    { success: boolean; message: string }
  >(data?.order ? orderByPlanId(data.plan.id) : null, "DELETE")

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
      setActionError("Something went wrong when submitting new order. Please try again.")
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
      setActionError("Something went wrong with cancellation. Please try again.")
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
          Week of {formatTitleDate(data.plan.period_start)} -{" "}
          {formatTitleDate(data.plan.period_end)}
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
