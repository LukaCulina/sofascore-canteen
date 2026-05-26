import { FormattedMessage, useIntl } from "react-intl"
import { Badge, Button, P, Text } from "@/components/ui"
import { Box, Flex } from "@/styled-system/jsx"
import type { OrderSelection } from "@/types"
import { GreyText } from "../styles"

interface MealCardProps {
  selection: OrderSelection
  unpaid: boolean
}

export const MealCard = ({ selection, unpaid }: MealCardProps) => {
  const intl = useIntl()

  const { meal, plan_day } = selection

  const finalPrice = (meal.price * (100 - meal.discount)) / 100
  const formattedMealDate = intl.formatDate(new Date(plan_day.day * 1000), {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Flex
      direction="column"
      gap="sm"
      p="lg"
      bg={unpaid ? "status.error.highlight" : "surface.s1"}
      borderWidth="thin"
      borderStyle="solid"
      borderColor={unpaid ? "status.error.default" : "neutrals.nLv4"}
      borderRadius="lg"
    >
      <Flex align="center" gap="sm">
        <GreyText>{formattedMealDate}</GreyText>
        {unpaid && (
          <Badge>
            <FormattedMessage id="orders.notPaid" />
          </Badge>
        )}
      </Flex>
      <Box>
        <P textStyle="display.small">{meal.description}</P>
        <GreyText>€{finalPrice.toFixed(2)}</GreyText>
      </Box>
      <Button variant="outline" px="md" width="fit-content">
        <Text textStyle="assistive.default" color="primary.default">
          <FormattedMessage id="orders.leaveFeedback" />
        </Text>
      </Button>
    </Flex>
  )
}
