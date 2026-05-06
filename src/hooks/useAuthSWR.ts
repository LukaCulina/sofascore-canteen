import useSWR from "swr"
import { useAuthStore } from "@/stores/auth"

export function useAuthSWR<T>(url: string) {
  const { token } = useAuthStore()

  return useSWR<T>(token ? url : null)
}
