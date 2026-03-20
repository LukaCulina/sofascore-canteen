import { useState } from "react"
import { IconArrowDown, IconArrowUp } from "@/components/icons"
import { P } from "@/components/ui/Text"
import { Flex } from "@/styled-system/jsx"
import { Td, Tr } from "../styles"
import type { ProcessedOrder } from "../types"
import { MealCard } from "./MealCard"

interface OrderRowProps {
  order: ProcessedOrder
}

export const OrderRow = ({ order }: OrderRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <Tr onClick={() => setIsExpanded(!isExpanded)} cursor="pointer" bg="surface.s1">
        <Td w="72px">{isExpanded ? <IconArrowUp /> : <IconArrowDown />}</Td>
        <Td>#{order.id}</Td>
        <Td>{order.user}</Td>
        <Td>{order.period}</Td>
        <Td>{order.submitted}</Td>
        <Td>{order.meals}</Td>
        <Td color="status.success.default">€{order.discount.toFixed(2)}</Td>
        <Td textAlign="right">€{order.total.toFixed(2)}</Td>
      </Tr>

      {isExpanded && (
        <Tr bg="surface.s1">
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
