import useSWR from "swr"
import { meals } from "@/api/routes"

interface Meal {
  id: number
  description: string
  price: number
  is_vegetarian: boolean
  discount: number
  image_url: string
}

interface MealsResponse {
  meals: Meal[]
}

export const useMeals = (enabled: boolean = true) => {
  const { data, error, isLoading } = useSWR<MealsResponse>(enabled ? meals() : null
  )

  return {
    meals: data?.meals ?? [],
    isLoading,
    error,
  }
}
