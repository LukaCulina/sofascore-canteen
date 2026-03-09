import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Plan } from "@/lib/types/mealOptions"

export interface MealSelectionState {
  selections: Record<number, number | null>
  init: (plan: Plan) => void
  setSelection: (day: number, mealId: number | null) => void
}

export const useMealSelectionStore = create<MealSelectionState>()(
  persist(
    (set, get) => ({
      selections: {},
      init: (plan) => {
        const currentSelections = get().selections
        const base: Record<number, number | null> = {}
        for (const day of plan.planDay) {
          base[day.id] = null
        }

        set({
          selections: { ...base, ...currentSelections },
        })
      },
      setSelection: (planDayId, dayMealId) => {
        set((state) => ({
          selections: { ...state.selections, [planDayId]: dayMealId },
        }))
      },
    }),
    {
      name: "meal-selections",
    },
  ),
)
