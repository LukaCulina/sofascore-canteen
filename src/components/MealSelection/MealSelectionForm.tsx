import { MealSelection } from "@/components/MealSelection/MealSelection.tsx"
import { Button } from "@/components/ui"
import { useSelections } from "@/hooks"
import type { Plan } from "@/lib/types/mealOptions"
import { Flex } from "@/styled-system/jsx"

interface MealSelectionFormProps {
  plan: Plan
}

export function MealSelectionForm({ plan }: Readonly<MealSelectionFormProps>) {
  const mealSelections = useSelections()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(mealSelections)
      }}
    >
      <Flex direction="column" gap="xl" mb="xl">
        {plan.planDay.map((day) => (
          <MealSelection key={day.id} item={day} />
        ))}
      </Flex>
      <Button type="submit">Submit</Button>
    </form>
  )
}
