import { useState } from "react"
import type { KeyedMutator } from "swr"
import { updatePaymentStatus } from "@/api/routes"
import { useAuthSWRMutation } from "@/hooks/useAuthSWRMutation"
import type { Order } from "@/types"

interface PaymentStatusUpdate {
  id: number
  unpaid: boolean
}

export const usePaymentEdit = (
  orders: Order[] | undefined,
  mutate: KeyedMutator<{ orders: Order[] }>,
) => {
  const [isEditing, setIsEditing] = useState(false)
  const [changes, setChanges] = useState<Record<number, boolean>>({})

  const {
    trigger,
    isMutating,
    error: saveError,
    reset,
  } = useAuthSWRMutation<{ updates: PaymentStatusUpdate[] }, void>(updatePaymentStatus())

  const handleEdit = () => setIsEditing(true)

  const handleSave = async () => {
    const originalUnpaid = new Map<number, boolean>()

    orders?.forEach((order) => {
      order.order_selection.forEach((s) => {
        originalUnpaid.set(s.id, s.unpaid)
      })
    })

    const updates = Object.entries(changes)
      .filter(([id, unpaid]) => originalUnpaid.get(Number(id)) !== unpaid)
      .map(([id, unpaid]) => ({ id: Number(id), unpaid }))

    if (updates.length === 0) {
      setIsEditing(false)
      setChanges({})
      return
    }

    try {
      await trigger({ updates })
      mutate()
      setIsEditing(false)
      setChanges({})
    } catch {
      // error state is handled by saveError
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setChanges({})
    reset()
  }

  return {
    isEditing,
    changes,
    setChanges,
    isMutating,
    saveError,
    handleEdit,
    handleSave,
    handleCancel,
  }
}
