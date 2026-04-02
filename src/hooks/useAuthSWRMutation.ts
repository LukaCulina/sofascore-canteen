import useSWRMutation from "swr/mutation"
import { postJson } from "@/api/http-client.ts"
import { useAuthStore } from "@/stores/auth.ts"

export function useAuthSWRMutation<TBody extends object, TResponse>(url: string) {
  const { token } = useAuthStore()

  return useSWRMutation(url, (url, { arg }: { arg: TBody }) =>
    postJson<TResponse>(url, arg, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  )
}
