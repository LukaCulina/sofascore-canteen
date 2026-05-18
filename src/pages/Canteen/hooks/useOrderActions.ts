import { useState } from "react"
import useSWRMutation from "swr/mutation"
import { requestJson } from "@/api/http-client.ts"
import { order, orderByPlanId } from "@/api/routes.ts"
import { useToastStore } from "@/stores/toast"
import type { MealOptions } from "@/types"
import { useInitialOrderSelections } from "./useInitialOrderSelections.ts"

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

interface DeleteOrderResponse {
  success: boolean
  message: string
}

export function useOrderActions(
  token: string | null,
  data: MealOptions | undefined,
  mutate: () => Promise<unknown>,
) {
  const [isEditingOrder, setIsEditingOrder] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [editSelectionsSnapshot, setEditSelectionsSnapshot] = useState<
    Record<number, number | null> | undefined
  >(undefined)

  const initialSelections = useInitialOrderSelections(data)
  const addToast = useToastStore((s) => s.addToast)

  const { trigger: createOrder, isMutating: isCreating } = useSWRMutation(
    token ? order() : null,
    (url: string, { arg }: { arg: SaveOrderPayload }) =>
      requestJson<SaveOrderResponse>("POST", url, arg),
  )

  const { trigger: updateOrder, isMutating: isUpdating } = useSWRMutation(
    token ? order() : null,
    (url: string, { arg }: { arg: SaveOrderPayload }) =>
      requestJson<SaveOrderResponse>("PUT", url, arg),
  )

  const { trigger: cancelOrder, isMutating: isDeleting } = useSWRMutation(
    token && data?.order ? orderByPlanId(data.plan.id) : null,
    (url: string) => requestJson<DeleteOrderResponse>("DELETE", url),
  )

  const closeEditMode = () => {
    setIsEditingOrder(false)
    setEditSelectionsSnapshot(undefined)
  }

  const openEditMode = () => {
    setEditSelectionsSnapshot(initialSelections)
    setIsEditingOrder(true)
  }

  const handleSubmit = async (selections: Record<number, number | null>) => {
    if (!data?.plan) return

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
        addToast("Order updated successfully.", "success")
        return
      }
      await createOrder(payload)
      await mutate()
      addToast("Order submitted successfully.", "success")
    } catch {
      addToast(
        isEditingOrder
          ? "Failed to update order. Please try again."
          : "Failed to submit order. Please try again.",
        "error",
      )
    }
  }

  const handleCancelOrder = async () => {
    if (!data?.order) {
      setIsCancelDialogOpen(false)
      return
    }

    try {
      await cancelOrder()
      await mutate()
      setIsCancelDialogOpen(false)
      closeEditMode()
      addToast("Order cancelled.", "success")
    } catch {
      addToast("Failed to cancel order. Please try again.", "error")
    }
  }

  const lockedDays = new Set(
    data?.order?.order_selection
      .filter((selection) => selection.transfer != null)
      .map((selection) => selection.plan_day.id) ?? [],
  )

  return {
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
  }
}
