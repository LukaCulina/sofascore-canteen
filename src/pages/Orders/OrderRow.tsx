import { useState } from "react"
import { IconArrowDown, IconArrowUp } from "@/components/icons"
import { P } from "@/components/ui/Text"
import { Box, Flex } from "@/styled-system/jsx"
import { MealCard } from "./MealCard"
import { Td, Tr } from "./styles"
import type { ProcessedOrder } from "./types"

interface OrderRowProps {
  order: ProcessedOrder
}

export const OrderRow = ({ order }: OrderRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <Tr>
        <Td w="72px">
          <Box
            as="button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <IconArrowUp /> : <IconArrowDown />}
          </Box>
        </Td>

        <Td>#{order.id}</Td>
        <Td>{order.user}</Td>
        <Td>{order.period}</Td>
        <Td>{order.submitted}</Td>
        <Td>{order.meals}</Td>
        <Td color="status.success.default">€{order.discount.toFixed(2)}</Td>
        <Td textAlign="right">€{order.total.toFixed(2)}</Td>
      </Tr>

      {isExpanded && (
        <Tr>
          <Td colSpan={8}>
            <P textStyle="display.micro" p="lg">
              Meal Selections:
            </P>
            <Flex p="lg" direction="row" flexWrap="wrap" gap="lg" w="100%">
              {order.orderSelection.map((selection) => (
                <MealCard key={selection.id} meal={selection.meal} planDay={selection.planDay} />
              ))}
            </Flex>
          </Td>
        </Tr>
      )}
    </>
  )
}
