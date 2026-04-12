import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { IconArrowDown, IconArrowUp } from "@/components/icons"
import { Badge, P } from "@/components/ui/"
import { Box, Flex } from "@/styled-system/jsx"
import { Td, Tr } from "../styles"
import { MealCard } from "./MealCard"
import type { ProcessedOrder } from "./OrdersTable"

export const OrderRow = ({ order }: { order: ProcessedOrder }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <Tr
        onClick={() => setIsExpanded(!isExpanded)}
        cursor="pointer"
        bg={order.hasUnpaid ? "status.error.highlight" : "surface.s1"}
      >
        <Td w="72px">{isExpanded ? <IconArrowUp /> : <IconArrowDown />}</Td>
        <Td>
          <Flex justify="space-between" align="center" gap="sm">
            #{order.id}
            {order.hasUnpaid && <Badge>Not Paid</Badge>}
          </Flex>
        </Td>
        <Td>{order.user}</Td>
        <Td>{order.period}</Td>
        <Td>{order.submitted}</Td>
        <Td>{order.meals}</Td>
        <Td color="status.success.default">€{order.discount.toFixed(2)}</Td>
        <Td textAlign="right">€{order.total.toFixed(2)}</Td>
      </Tr>

      <AnimatePresence>
        {isExpanded && (
          <Tr bg="surface.s1">
            <Td colSpan={8}>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <P textStyle="display.micro" p="lg">
                  Meal Selections:
                </P>
                <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" p="lg" gap="lg">
                  {order.order_selection.map((selection) => (
                    <MealCard key={selection.id} selection={selection} />
                  ))}
                </Box>
              </motion.div>
            </Td>
          </Tr>
        )}
      </AnimatePresence>
    </>
  )
}
