import { useIntl } from "react-intl"
import { order } from "@/api/routes.ts"
import { Spinner, StatusMessage } from "@/components/ui"
import { Text } from "@/components/ui/Text"
import { useAuthSWR } from "@/hooks/useAuthSWR.ts"
import { mockMealOptions } from "@/mocks/mealOptions.ts"
import { MealSelectionForm } from "@/pages/Canteen/components/MealSelection"
import { ConfirmedOrder } from "@/pages/Canteen/components/Order"
import { Flex } from "@/styled-system/jsx"
import type { MealOptions } from "@/types"

export const CanteenPage = () => {
  const { data, error, isLoading } = useAuthSWR<MealOptions>(order())
  const intl = useIntl()

  const formatTitleDate = (unixTime: number) =>
    intl.formatDate(new Date(unixTime), { month: "short", day: "numeric" })

  if (isLoading) {
    return (
      <Flex justify="center" align="center" py="6xl">
        <Spinner />
      </Flex>
    )
  }

  if (error || !data)
    return (
      <Flex justify="center" align="center" py="6xl">
        <StatusMessage variant="error">Failed to load meal options</StatusMessage>
      </Flex>
    )

  return (
    <Flex direction="column" gap="xl">
      <Flex direction="column" gap="lg">
        <Text textStyle="display.extraLarge">
          Week of {formatTitleDate(mockMealOptions.plan.periodStart)} -{" "}
          {formatTitleDate(mockMealOptions.plan.periodEnd)}
        </Text>
        <Text textStyle="body.large">Choose your meals for the upcoming work week.</Text>
      </Flex>
      {data.order ? <ConfirmedOrder order={data.order} /> : <MealSelectionForm plan={data?.plan} />}
    </Flex>
  )
}
