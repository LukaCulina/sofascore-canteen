import { useEffect } from "react"
import { MealSelectionForm } from "@/components/MealSelection"
import { Text } from "@/components/ui/Text"
import { useInitSelection } from "@/hooks"
import { mockMealOptions } from "@/mocks/mealOptions.ts"
import { Flex } from "@/styled-system/jsx"

const titleDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
})

const formatTitleDate = (unixTime: number): string => titleDateFormatter.format(new Date(unixTime))

export const CanteenPage = () => {
  const init = useInitSelection()

  useEffect(() => {
    init(mockMealOptions.plan)
  }, [])

  return (
    <Flex direction="column" gap="xl">
      <Flex direction="column" gap="lg">
        <Text textStyle="display.extraLarge">
          Week of {formatTitleDate(mockMealOptions.plan.periodStart)} -{" "}
          {formatTitleDate(mockMealOptions.plan.periodEnd)}
        </Text>
        <Text textStyle="body.large">Choose your meals for the upcoming work week.</Text>
      </Flex>
      <MealSelectionForm plan={mockMealOptions.plan} />
    </Flex>
  )
}
