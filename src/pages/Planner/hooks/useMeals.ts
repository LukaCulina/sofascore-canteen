import useSWR from "swr"
import { meals } from "@/api/routes"
import type { Meals } from "@/types"

export const useMeals = (enabled: boolean = true) => {
  const { data, error, isLoading } = useSWR<Meals>(enabled ? meals() : null)

  return {
    meals: data?.meals ?? [],
    isLoading,
    error,
  }
}
