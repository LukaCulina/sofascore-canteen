import { useEffect, useReducer } from "react"
import { Button, Spinner } from "@/components/ui"
import { MealSelection } from "@/pages/Canteen/components/MealSelection/MealSelection.tsx"
import {
  initialMealSelectionState,
  mealSelectionReducer,
} from "@/pages/Canteen/mealSelectionReducer.ts"
import { Flex } from "@/styled-system/jsx"
import type { Plan } from "@/types"

interface MealSelectionFormProps {
  plan: Plan
  initialSelections?: Record<number, number | null>
  submitLabel?: string
  isSubmitting?: boolean
  onCancel?: () => void
  onSubmit: (selections: Record<number, number | null>) => void | Promise<void>
  lockedDays?: Set<number>
}

export function MealSelectionForm({
  plan,
  initialSelections,
  submitLabel = "Submit",
  isSubmitting = false,
  onCancel,
  onSubmit,
  lockedDays,
}: Readonly<MealSelectionFormProps>) {
  const [state, dispatch] = useReducer(mealSelectionReducer, initialMealSelectionState)

  useEffect(() => {
    dispatch({ type: "INIT", payload: { plan, prefilledSelections: initialSelections } })
  }, [plan, initialSelections])

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await onSubmit(state.selections)
      }}
    >
      <Flex direction="column" gap="xl" mb="xl">
        {plan.plan_day.map((day) => (
          <MealSelection
            key={day.id}
            item={day}
            selectedMealId={state.selections[day.id] ?? null}
            dispatch={dispatch}
            isLocked={lockedDays?.has(day.id) ?? false}
          />
        ))}
      </Flex>
      <Flex gap="md" justifyContent="flex-end">
        {onCancel ? (
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            type="button"
            minW="fit-content"
          >
            Cancel
          </Button>
        ) : null}
        <Button disabled={isSubmitting} type="submit" minW="fit-content">
          {isSubmitting ? (
            <Flex alignItems="center" gap="sm">
              <Spinner size="sm" />
              Saving...
            </Flex>
          ) : (
            submitLabel
          )}
        </Button>
      </Flex>
    </form>
  )
}
