import useSWR from "swr"
import { plans } from "@/api/routes"
import type { Plan } from "@/types"

export const usePlans = () => {
  const { data, error, isLoading } = useSWR<Plan[]>(plans())

  return {
    plans: data ?? [],
    isLoading,
    error,
  }
}
