import { useIntl } from "react-intl"
import { Badge, Button, P, Text } from "@/components/ui"
import { Box, Flex } from "@/styled-system/jsx"
import { GreyText } from "../styles"
import type { OrderSelection } from "../types"

interface MealCardProps {
  selection: OrderSelection
}

export const MealCard = ({ selection }: MealCardProps) => {
  const intl = useIntl()
  const { meal, plan_day, unpaid } = selection

  const finalPrice = (meal.price * (100 - meal.discount)) / 100
  const formattedMealDate = intl.formatDate(new Date(plan_day.day * 1000), {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Flex
      p="lg"
      border="1px solid"
      borderColor={unpaid ? "status.error.default" : "neutrals.nLv4"}
      borderRadius="lg"
      bg={unpaid ? "status.error.highlight" : "surface.s1"}
      gap="sm"
      direction="column"
      width={{ base: "100%", lg: "31%" }}
    >
      <Flex align="center" gap="sm">
        <GreyText>{formattedMealDate}</GreyText>
        {unpaid && <Badge>Not Paid</Badge>}
      </Flex>
      <Box>
        <P textStyle="display.small">{meal.description}</P>
        <GreyText>€{finalPrice.toFixed(2)}</GreyText>
      </Box>
      <Button variant="outline" px="md" width="fit-content">
        <Text textStyle="assistive.default" color="primary.default">
          Leave Feedback
        </Text>
      </Button>
    </Flex>
  )
}
