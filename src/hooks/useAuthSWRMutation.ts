import useSWRMutation from "swr/mutation"
import { deleteJson, postJson, putJson } from "@/api/http-client.ts"
import { useAuthStore } from "@/stores/auth.ts"

type MutationMethod = "POST" | "PUT" | "DELETE"

export function useAuthSWRMutation<TBody = undefined, TResponse = unknown>(
  url: string | null,
  method: MutationMethod = "POST",
) {
  const { token } = useAuthStore()

  return useSWRMutation(url ?? null, (url, { arg }: { arg: TBody }) =>
    method === "PUT"
      ? putJson<TResponse>(url, arg ?? {}, {
          headers: { Authorization: `Bearer ${token}` },
        })
      : method === "DELETE"
        ? deleteJson<TResponse>(url, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : postJson<TResponse>(url, arg ?? {}, {
            headers: { Authorization: `Bearer ${token}` },
          }),
  )
}
