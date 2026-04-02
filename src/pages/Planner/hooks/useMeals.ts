import useSWR from "swr"
import { meals } from "@/api/routes"
import type { Meal } from "@/types/meal"

interface MealsResponse {
  meals: Meal[]
}

export const useMeals = (enabled: boolean = true) => {
  const { data, error, isLoading } = useSWR<MealsResponse>(enabled ? meals() : null)

  return {
    meals: data?.meals ?? [],
    isLoading,
    error,
  }
}
