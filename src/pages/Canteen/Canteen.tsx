import { useIntl } from "react-intl"
import { order } from "@/api/routes.ts"
import { ErrorMessage, LoadingSpinner } from "@/components/ui"
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
    return <LoadingSpinner />
  }

  if (error || !data) return <ErrorMessage>Failed to load meal options</ErrorMessage>

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
