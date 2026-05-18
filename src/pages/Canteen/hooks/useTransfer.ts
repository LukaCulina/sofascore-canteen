import { useState } from "react"
import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import { getJson, requestJson } from "@/api/http-client.ts"
import { transfer, users } from "@/api/routes"
import type { User } from "@/types"

export function useTransfer(token: string | null, mutate: () => Promise<unknown>) {
  const [transferSelectionId, setTransferSelectionId] = useState<number | null>(null)

  const { data: usersData, isLoading: isLoadingUsers, error: usersError } = useSWR<{ users: User[] }>(
    token && transferSelectionId !== null ? users() : null,
    (url: string) => getJson<{ users: User[] }>(url),
  )

  const {
    trigger: transferMeal,
    isMutating: isTransferring,
    error: transferError,
    reset,
  } = useSWRMutation(
    token ? transfer() : null,
    (url: string, { arg }: { arg: { order_selection_id: number; to_user_id: string } }) =>
      requestJson("POST", url, arg),
  )

  const handleTransfer = async (userId: string) => {
    if (transferSelectionId === null) return

    try {
      await transferMeal({ order_selection_id: transferSelectionId, to_user_id: userId })
      await mutate()
      setTransferSelectionId(null)
    } catch {
      // transferError from useSWRMutation handles the error state
    }
  }

  const handleCancel = () => {
    reset()
    setTransferSelectionId(null)
  }

  return {
    transferSelectionId,
    setTransferSelectionId,
    users: usersData?.users ?? [],
    isLoadingUsers,
    usersError,
    isTransferring,
    transferError,
    handleTransfer,
    handleCancel,
  }
}
