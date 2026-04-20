import { useMemo } from "react"
import type { MealOptions } from "@/types"

export const useInitialOrderSelections = (data?: MealOptions) => {
  return useMemo(() => {
    if (!data?.order) {
      return undefined
    }

    const selectedMealsByPlanDay = data.order.order_selection.reduce<Record<number, number | null>>(
      (acc, selection) => {
        acc[selection.plan_day_id] = selection.meal_id ?? null
        return acc
      },
      {},
    )

    return data.plan.plan_day.reduce<Record<number, number | null>>((acc, day) => {
      acc[day.id] = selectedMealsByPlanDay[day.id] ?? null
      return acc
    }, {})
  }, [data])
}

