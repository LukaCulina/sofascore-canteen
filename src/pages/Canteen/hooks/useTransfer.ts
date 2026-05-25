import { useState } from "react"
import { useIntl } from "react-intl"
import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import { getJson, requestJson } from "@/api/http-client.ts"
import { transfer, users } from "@/api/routes"
import { useToastStore } from "@/stores/toast"
import type { User } from "@/types"

export function useTransfer(token: string | null, mutate: () => Promise<unknown>) {
  const [transferSelectionId, setTransferSelectionId] = useState<number | null>(null)

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useSWR<{ users: User[] }>(
    token && transferSelectionId !== null ? users() : null,
    (url: string) => getJson<{ users: User[] }>(url),
  )

  const {
    trigger: transferMeal,
    isMutating: isTransferring,
    reset,
  } = useSWRMutation(
    token ? transfer() : null,
    (url: string, { arg }: { arg: { order_selection_id: number; to_user_id: string } }) =>
      requestJson("POST", url, arg),
  )

  const addToast = useToastStore((s) => s.addToast)
  const intl = useIntl()

  const handleTransfer = async (userId: string) => {
    if (transferSelectionId === null) return

    try {
      await transferMeal({ order_selection_id: transferSelectionId, to_user_id: userId })
      await mutate()
      setTransferSelectionId(null)
      addToast(intl.formatMessage({ id: "toast.mealTransferred" }), "success")
    } catch {
      addToast(intl.formatMessage({ id: "toast.mealTransferFailed" }), "error")
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
    handleTransfer,
    handleCancel,
  }
}
