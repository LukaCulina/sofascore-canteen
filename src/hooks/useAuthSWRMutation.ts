import useSWRMutation from "swr/mutation"
import { postJson } from "@/api/http-client"

export function useAuthSWRMutation<TBody extends object, TResponse>(url: string) {
  return useSWRMutation(url, (url, { arg }: { arg: TBody }) => postJson<TResponse>(url, arg))
}
