import { useEffect } from "react"
import { useIntl } from "react-intl"
import { Text } from "@/components/ui/Text"
import { mockMealOptions } from "@/mocks/mealOptions.ts"
import { useInitSelection } from "@/pages/Canteen/hooks"
import { MealSelectionForm } from "@/pages/Canteen/MealSelection"
import { Flex } from "@/styled-system/jsx"

export const CanteenPage = () => {
  const init = useInitSelection()
  const intl = useIntl()

  const formatTitleDate = (unixTime: number) =>
    intl.formatDate(new Date(unixTime), { month: "short", day: "numeric" })

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
