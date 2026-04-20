import { useState, useTransition } from "react"
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
  const [isEditTransitionPending, startEditTransition] = useTransition()
  const intl = useIntl()

  const initialSelections = useInitialOrderSelections(data)

  const { trigger: createOrder, isMutating: isCreating, error: createError } = useAuthSWRMutation<
    SaveOrderPayload,
    SaveOrderResponse
  >(order(), "POST")

  const { trigger: updateOrder, isMutating: isUpdating, error: updateError } = useAuthSWRMutation<
    SaveOrderPayload,
    SaveOrderResponse
  >(order(), "PUT")

  const { trigger: cancelOrder, isMutating: isDeleting, error: deleteError } = useAuthSWRMutation<
    undefined,
    { success: boolean; message: string }
  >(data?.order ? orderByPlanId(data.plan.id) : null, "DELETE")

  const formatTitleDate = (unixTime: number) =>
    intl.formatDate(new Date(unixTime * 1000), { month: "short", day: "numeric" })

  const closeEditMode = () => {
    startEditTransition(() => {
      setIsEditingOrder(false)
    })
  }

  const openEditMode = () => {
    startEditTransition(() => {
      setIsEditingOrder(true)
    })
  }

  const handleSubmit = async (selections: Record<number, number | null>) => {
    if (!data?.plan) {
      return
    }

    const payload: SaveOrderPayload = {
      planId: data.plan.id,
      isDraft: false,
      selections,
    }

    if (isEditingOrder) {
      await updateOrder(payload)
      await mutate()
      closeEditMode()
      return
    }

    await createOrder(payload)
    await mutate()
  }

  const handleCancelOrder = async () => {
    if (!data?.order) {
      setIsCancelDialogOpen(false)
      return
    }

    await cancelOrder(undefined)
    await mutate()
    setIsCancelDialogOpen(false)
    closeEditMode()
  }

  const mutationError = createError ?? updateError ?? deleteError

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
          Week of {formatTitleDate(data.plan.period_start)} - {formatTitleDate(data.plan.period_end)}
        </Text>
        <Text textStyle="body.large">Choose your meals for the upcoming work week.</Text>
      </Flex>

      {mutationError ? <StatusMessage variant="error">Something went wrong. Please try again.</StatusMessage> : null}

      {data.order && !isEditingOrder ? (
        <SummaryCard
          order={data.order}
          onEdit={openEditMode}
          onCancelOrder={() => setIsCancelDialogOpen(true)}
          isDeleting={isDeleting || isEditTransitionPending}
        />
      ) : (
        <MealSelectionForm
          plan={data.plan}
          initialSelections={isEditingOrder ? initialSelections : undefined}
          onSubmit={handleSubmit}
          isSubmitting={isCreating || isUpdating || isEditTransitionPending}
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
