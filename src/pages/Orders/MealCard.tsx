import { Button, P } from "@/components/ui"
import { Box, Flex } from "@/styled-system/jsx"
import { GreyText } from "./styles"
import type { Meal, PlanDay } from "./types"

interface MealCardProps {
  meal: Meal
  planDay: PlanDay
}

export const MealCard = ({ meal, planDay }: MealCardProps) => {
  const finalPrice = (meal.price * (100 - meal.discount)) / 100
  const rawIsoDate = planDay ? new Date(planDay.day).toISOString().replace(".000Z", "+00:00") : ""

  return (
    <Flex p="lg" border="1px solid gray" borderRadius="lg" bg="surface.s1" gap="sm" direction="column">
      <GreyText>{rawIsoDate}</GreyText>
      <Box>
        <P textStyle="display.small">{meal.description}</P>
        <GreyText>€{finalPrice.toFixed(2)}</GreyText>
      </Box>
      <Button variant="outline" px="md">
        Leave Feedback
      </Button>
    </Flex>
  )
}
