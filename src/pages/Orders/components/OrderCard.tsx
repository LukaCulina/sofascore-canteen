import { useState } from "react"
import { IconArrowDown, IconArrowUp } from "@/components/icons"
import { P, Text } from "@/components/ui/Text"
import { Box, Flex } from "@/styled-system/jsx"
import { GreyText } from "../styles"
import type { ProcessedOrder } from "../types"
import { MealCard } from "./MealCard"

export const OrderCard = ({ order }: { order: ProcessedOrder }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Flex
      direction="column"
      gap="lg"
      border="1px solid"
      borderColor="neutrals.nLv4"
      borderRadius="lg"
      overflow="hidden"
      bg="surface.s1"
    >
      <Flex
        p="lg"
        justify="space-between"
        align="center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Flex direction="column" gap="sm">
          <Flex align="center" gap="md">
            <Text textStyle="display.medium">#{order.id}</Text>
            <GreyText>{order.user}</GreyText>
          </Flex>
          <GreyText>{order.submitted}</GreyText>
          <Flex gap="4xl">
            <GreyText>{order.period}</GreyText>
            <GreyText>{order.meals} meals</GreyText>
          </Flex>
        </Flex>

        <Flex direction="column" align="end" gap="xs">
          <Text textStyle="display.small">€{order.total.toFixed(2)}</Text>
          <Text textStyle="assistive.default" color="status.success.default">
            -€{order.discount.toFixed(2)}
          </Text>
          {isExpanded ? <IconArrowUp /> : <IconArrowDown />}
        </Flex>
      </Flex>

      {isExpanded && (
        <Box p="md">
          <P textStyle="display.micro" mb="md">
            Meal Selections:
          </P>
          <Flex direction="column" gap="md">
            {order.orderSelection.map((selection) => (
              <MealCard key={selection.id} meal={selection.meal} planDay={selection.planDay} />
            ))}
          </Flex>
        </Box>
      )}
    </Flex>
  )
}
