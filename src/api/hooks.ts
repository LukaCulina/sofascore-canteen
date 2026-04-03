import useSWR from "swr"
import { getJson } from "@/api/http-client"
import { useAuthStore } from "@/stores/auth"

export function useAuthSWR<T>(url: string) {
  const { token } = useAuthStore()

  const fetcher = (url: string) => {
    if (!token) {
      throw new Error("No auth token")
    }
    return getJson<T>(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  return useSWR<T>(token ? url : null, fetcher, {
    revalidateOnFocus: false,
  })
}
