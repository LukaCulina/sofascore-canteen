import { type Dispatch, memo, useCallback } from "react"
import { useIntl } from "react-intl"
import { DateItem } from "@/pages/Canteen/components/MealSelection/DateItem.tsx"
import { MealItem } from "@/pages/Canteen/components/MealSelection/MealItem"
import type { MealSelectionAction } from "@/pages/Canteen/mealSelectionReducer.ts"
import { Flex } from "@/styled-system/jsx"
import type { PlanDay } from "@/types"

interface MealSelectionProps {
  item: PlanDay
  selectedMealId: number | null
  dispatch: Dispatch<MealSelectionAction>
  isLocked: boolean
}
export const MealSelection = memo(function MealSelection({
  item,
  selectedMealId,
  dispatch,
  isLocked,
}: Readonly<MealSelectionProps>) {
  const intl = useIntl()
  const handleMealChange = useCallback(
    (mealId: number | null) => {
      dispatch({ type: "SET_SELECTION", payload: { planDayId: item.id, mealId } })
    },
    [item.id, dispatch],
  )

  return (
    <Flex direction="column" rounded="lg" divideY="thin" divideColor="neutrals.nLv4">
      <DateItem date={new Date(item.day * 1000)} />
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
          isDisabled={isLocked}
        />
      ))}
      <MealItem
        title={intl.formatMessage({ id: "mealSelection.noMeal" })}
        description={intl.formatMessage({ id: "mealSelection.optOut" })}
        isNoMeal={true}
        onChange={handleMealChange}
        mealId={null}
        checked={selectedMealId === null}
        isDisabled={isLocked}
      />
    </Flex>
  )
})
