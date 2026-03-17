import { useEffect, useReducer } from "react"
import { Button } from "@/components/ui"
import type { Plan } from "@/lib/types/mealOptions"
import { MealSelection } from "@/pages/Canteen/MealSelection/MealSelection.tsx"
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

  useEffect(() => {
    dispatch({ type: "INIT", payload: plan })
  }, [plan])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(state.selections)
      }}
    >
      <Flex direction="column" gap="xl" mb="xl">
        {plan.planDay.map((day) => (
          <MealSelection
            key={day.id}
            item={day}
            selectedMealId={state.selections[day.id] ?? null}
            dispatch={dispatch}
          />
        ))}
      </Flex>
      <Button type="submit">Submit</Button>
    </form>
  )
}
