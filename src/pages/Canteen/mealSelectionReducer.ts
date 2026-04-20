import type { Plan } from "@/types"

export interface MealSelectionState {
  selections: Record<number, number | null>
}

export type MealSelectionAction =
  | {
      type: "INIT"
      payload: { plan: Plan; prefilledSelections?: Record<number, number | null> }
    }
  | { type: "SET_SELECTION"; payload: { planDayId: number; mealId: number | null } }

export const mealSelectionReducer = (
  state: MealSelectionState,
  action: MealSelectionAction,
): MealSelectionState => {
  switch (action.type) {
    case "INIT": {
      const base: Record<number, number | null> = {}
      for (const day of action.payload.plan.plan_day) {
        base[day.id] = action.payload.prefilledSelections?.[day.id] ?? null
      }
      return { selections: base }
    }
    case "SET_SELECTION": {
      return {
        selections: {
          ...state.selections,
          [action.payload.planDayId]: action.payload.mealId,
        },
      }
    }
    default:
      return state
  }
}

export const initialMealSelectionState: MealSelectionState = {
  selections: {},
}
