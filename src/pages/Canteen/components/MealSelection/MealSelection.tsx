import { type Dispatch, memo, useCallback } from "react"
import { DateItem } from "@/pages/Canteen/components/MealSelection/DateItem.tsx"
import { MealItem } from "@/pages/Canteen/components/MealSelection/MealItem"
import type { MealSelectionAction } from "@/pages/Canteen/mealSelectionReducer.ts"
import { Flex } from "@/styled-system/jsx"
import type { PlanDay } from "@/types"

interface MealSelectionProps {
  item: PlanDay
  selectedMealId: number | null
  dispatch: Dispatch<MealSelectionAction>
}
export const MealSelection = memo(function MealSelection({
  item,
  selectedMealId,
  dispatch,
}: Readonly<MealSelectionProps>) {
  const handleMealChange = useCallback(
    (mealId: number | null) => {
      dispatch({ type: "SET_SELECTION", payload: { planDayId: item.id, mealId } })
    },
    [item.id, dispatch],
  )

  return (
    <Flex direction="column" rounded="lg" divideY={1} divideColor="neutrals.nLv4">
      <DateItem date={new Date(item.day)} />
      {item.day_meal.map((meal) => (
        <MealItem
          key={meal.meal.id}
          title={meal.meal.description}
          price={meal.meal.price}
          image={meal.meal.image_url}
          isVegan={meal.meal.is_vegetarian}
          onChange={handleMealChange}
          mealId={meal.meal.id}
          checked={selectedMealId === meal.meal.id}
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
