import { memo, useCallback } from "react"
import { DateItem } from "@/components/MealSelection/DateItem.tsx"
import { MealItem } from "@/components/MealSelection/MealItem"
import { useSelectionFromDay, useSetSelection } from "@/hooks"
import type { PlanDay } from "@/lib/types/mealOptions"
import { Flex } from "@/styled-system/jsx"

interface MealSelectionProps {
  item: PlanDay
}
export const MealSelection = memo(function MealSelection({ item }: Readonly<MealSelectionProps>) {
  const setSelection = useSetSelection()
  const selectedMealId = useSelectionFromDay(item.id)

  const handleMealChange = useCallback(
    (mealId: number | null) => setSelection(item.id, mealId),
    [item.id, setSelection],
  )

  return (
    <Flex direction="column" rounded="lg" bg="red.100" divideY={1} divideColor="neutrals.nLv4">
      <DateItem date={new Date(item.day)} />
      {item.dayMeal.map((meal) => (
        <MealItem
          key={meal.id}
          title={meal.meal.description}
          price={meal.meal.price}
          image={meal.meal.imageUrl}
          isVegan={meal.meal.isVegetarian}
          onChange={handleMealChange}
          mealId={meal.id}
          checked={selectedMealId === meal.id}
        />
      ))}
      <MealItem
        title="No Meal"
        description="Opt-out for this day"
        isNoMeal={true}
        onChange={handleMealChange}
        mealId={null}
        checked={selectedMealId === null}
      />
    </Flex>
  )
})
