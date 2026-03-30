import { useEffect, useReducer } from "react"
import { order } from "@/api/routes.ts"
import { Button } from "@/components/ui"
import { useAuthSWRMutation } from "@/hooks/useAuthSWRMutation.ts"
import type { Plan } from "@/lib/types/mealOptions"
import { MealSelection } from "@/pages/Canteen/components/MealSelection/MealSelection.tsx"
import {
  initialMealSelectionState,
  mealSelectionReducer,
} from "@/pages/Canteen/mealSelectionReducer.ts"
import { Flex } from "@/styled-system/jsx"

interface MealSelectionFormProps {
  plan: Plan
}

export function MealSelectionForm({ plan }: Readonly<MealSelectionFormProps>) {
  const [state, dispatch] = useReducer(mealSelectionReducer, initialMealSelectionState)
  const { trigger, isMutating, error } = useAuthSWRMutation<
    { planId: number; isDraft: boolean; selections: Record<string, number | null> },
    { success: boolean; orderId: number; message: string }
  >(order())

  useEffect(() => {
    dispatch({ type: "INIT", payload: plan })
  }, [plan])

  if (error) {
    // alert until toast component is implemented
    alert("Something went wrong, please try again later")
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        trigger({ planId: plan.id, isDraft: false, selections: state.selections })
      }}
    >
      <Flex direction="column" gap="xl" mb="xl">
        {plan.plan_day.map((day) => (
          <MealSelection
            key={day.id}
            item={day}
            selectedMealId={state.selections[day.id] ?? null}
            dispatch={dispatch}
          />
        ))}
      </Flex>
      <Button disabled={isMutating} type="submit">
        Submit
      </Button>
    </form>
  )
}
