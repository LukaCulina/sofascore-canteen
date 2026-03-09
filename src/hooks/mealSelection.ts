import { useMealSelectionStore } from "@/stores/mealSelection.ts"

export function useSelections() {
  return useMealSelectionStore((s) => s.selections)
}

export function useSelectionFromDay(dayMealId: number) {
  return useMealSelectionStore((s) => s.selections[dayMealId] ?? null)
}

export const useInitSelection = () => useMealSelectionStore((s) => s.init)
export const useSetSelection = () => useMealSelectionStore((s) => s.setSelection)
