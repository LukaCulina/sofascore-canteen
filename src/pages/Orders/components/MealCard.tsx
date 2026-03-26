import { useIntl } from "react-intl"
import { Button, P, Text } from "@/components/ui"
import { Box, Flex } from "@/styled-system/jsx"
import { GreyText } from "../styles"
import type { Meal, PlanDay } from "../types"

interface MealCardProps {
  meal: Meal
  planDay: PlanDay
}

export const MealCard = ({ meal, planDay }: MealCardProps) => {
  const intl = useIntl()

  const finalPrice = (meal.price * (100 - meal.discount)) / 100
  const formattedMealDate = intl.formatDate(new Date(planDay.day), {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Flex
      p="lg"
      border="1px solid"
      borderColor="neutrals.nLv4"
      borderRadius="lg"
      bg="surface.s1"
      gap="sm"
      direction="column"
      width={{ base: "100%", lg: "31%" }}
    >
      <GreyText>{formattedMealDate}</GreyText>
      <Box>
        <P textStyle="display.small">{meal.description}</P>
        <GreyText>€{finalPrice.toFixed(2)}</GreyText>
      </Box>
      <Button variant="outline" px="md" width="115px">
        <Text textStyle="assistive.default" color="primary.default">
          Leave Feedback
        </Text>
      </Button>
    </Flex>
  )
}
