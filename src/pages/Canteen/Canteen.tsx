import { useIntl } from "react-intl"
import { order } from "@/api/routes.ts"
import { Spinner } from "@/components/spinner"
import { Text } from "@/components/ui/Text"
import { useAuthSWR } from "@/hooks/useAuthSWR.ts"
import type { MealOptions } from "@/lib/types/mealOptions"
import { mockMealOptions } from "@/mocks/mealOptions.ts"
import { MealSelectionForm } from "@/pages/Canteen/components/MealSelection"
import { ConfirmedOrder } from "@/pages/Canteen/components/Order"
import { Flex } from "@/styled-system/jsx"

export const CanteenPage = () => {
  const { data, error, isLoading } = useAuthSWR<MealOptions>(order())
  const intl = useIntl()

  const formatTitleDate = (unixTime: number) =>
    intl.formatDate(new Date(unixTime), { month: "short", day: "numeric" })

  if (isLoading) {
    return (
      <Flex h="full" direction="column" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    )
  }

  if (error || !data) return <Text>Something went wrong</Text>

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
