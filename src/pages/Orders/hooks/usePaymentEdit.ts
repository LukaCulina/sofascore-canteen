import { useState } from "react"
import type { KeyedMutator } from "swr"
import { updatePaymentStatus } from "@/api/routes"
import { useAuthSWRMutation } from "@/hooks/useAuthSWRMutation"
import type { Order } from "@/types"

interface PaymentStatusUpdate {
  id: number
  unpaid: boolean
}

export const usePaymentEdit = (mutate: KeyedMutator<{ orders: Order[] }>) => {
  const [isEditing, setIsEditing] = useState(false)
  const [changes, setChanges] = useState<Record<number, boolean>>({})

  const {
    trigger,
    isMutating,
    error: saveError,
  } = useAuthSWRMutation<{ updates: PaymentStatusUpdate[] }, void>(updatePaymentStatus())

  const handleEdit = () => setIsEditing(true)

  const handleSave = async () => {
    try {
      const updates = Object.entries(changes).map(([id, unpaid]) => ({
        id: Number(id),
        unpaid,
      }))

      await trigger({ updates })

      mutate()
      setIsEditing(false)
      setChanges({})
    } catch {
      //error is handled by SWR
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setChanges({})
  }

  return {
    isEditing,
    setIsEditing,
    changes,
    setChanges,
    isMutating,
    saveError,
    handleEdit,
    handleSave,
    handleCancel,
  }
}
