import { useState } from "react"
import useSWRMutation from "swr/mutation"
import { requestJson } from "@/api/http-client.ts"
import { order, orderByPlanId } from "@/api/routes.ts"
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
  const [actionError, setActionError] = useState<string | null>(null)
  const [editSelectionsSnapshot, setEditSelectionsSnapshot] = useState<
    Record<number, number | null> | undefined
  >(undefined)

  const initialSelections = useInitialOrderSelections(data)

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

  const lockedDays = new Set(
    data?.order?.order_selection
      .filter((selection) => selection.transfer != null)
      .map((selection) => selection.plan_day.id) ?? [],
  )

  return {
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
  }
}
