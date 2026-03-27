import useSWR from "swr"
import { getJson } from "@/api/http-client.ts"
import { useAuthStore } from "@/stores/auth.ts"

export function useAuthSWR<T>(url: string) {
  const { token } = useAuthStore.getState()

  return useSWR<T>(url, (url: string) =>
    getJson<T>(url, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  )
}
