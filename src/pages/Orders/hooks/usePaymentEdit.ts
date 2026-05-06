import { useState } from "react"
import type { KeyedMutator } from "swr"
import useSWRMutation from "swr/mutation"
import { requestJson } from "@/api/http-client"
import { updatePaymentStatus } from "@/api/routes"
import { useAuthStore } from "@/stores/auth"
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
  const [isSaving, setIsSaving] = useState(false)

  const { token } = useAuthStore()

  const {
    trigger,
    error: saveError,
    reset,
  } = useSWRMutation(
    token ? updatePaymentStatus() : null,
    (url: string, { arg }: { arg: { updates: PaymentStatusUpdate[] } }) =>
      requestJson<void>("POST", url, arg),
  )

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

    if (!orders || updates.length === 0) {
      setIsEditing(false)
      setChanges({})
      return
    }

    setIsSaving(true)
    try {
      await trigger({ updates })
      await mutate()
      setIsEditing(false)
      setChanges({})
    } catch {
      // error state is handled by saveError
    } finally {
      setIsSaving(false)
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
    isSaving,
    saveError,
    handleEdit,
    handleSave,
    handleCancel,
  }
}
