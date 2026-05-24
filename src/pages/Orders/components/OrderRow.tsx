import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { IconArrowDown, IconArrowUp } from "@/components/icons"
import { Badge, P } from "@/components/ui/"
import { Flex, Grid } from "@/styled-system/jsx"
import { Checkbox, Td, Tr } from "../styles"
import { MealCard } from "./MealCard"
import type { ProcessedOrder } from "./OrdersTable"

interface OrderRowProps {
  order: ProcessedOrder
  isEditing: boolean
  changes: Record<number, boolean>
  setChanges: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
}

export const OrderRow = ({ order, isEditing, changes, setChanges }: OrderRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isUnpaid = order.order_selection.some((s) => changes[s.id] ?? s.unpaid)

  const toggleAll = (next: boolean) => {
    setChanges((prev) => {
      const updated = { ...prev }
      order.order_selection.forEach((s) => {
        updated[s.id] = next
      })
      return updated
    })
  }

  const handleRowClick = () => {
    if (!isEditing) {
      setIsExpanded((prev) => !prev)
    } else {
      toggleAll(!isUnpaid)
    }
  }

  return (
    <>
      <Tr
        data-testid={`order-row-${order.id}`}
        onClick={handleRowClick}
        cursor="pointer"
        bg={isUnpaid ? "status.error.highlight" : "surface.s1"}
      >
        <Td w="72px">
          {isEditing ? (
            <Flex align="center" justify="center" h="xl" w="xl">
              <Checkbox
                type="checkbox"
                checked={isUnpaid}
                onChange={(e) => toggleAll(e.target.checked)}
              />
            </Flex>
          ) : isExpanded ? (
            <IconArrowUp />
          ) : (
            <IconArrowDown />
          )}
        </Td>
        <Td>
          <Flex align="center" justify="space-between" gap="sm" wrap="wrap">
            #{order.id}
            {isUnpaid && <Badge>Not Paid</Badge>}
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
                <Grid gridTemplateColumns="repeat(3, 1fr)" p="lg" gap="lg">
                  {order.order_selection.map((selection) => (
                    <MealCard
                      key={selection.id}
                      selection={selection}
                      unpaid={changes[selection.id] ?? selection.unpaid}
                    />
                  ))}
                </Grid>
              </motion.div>
            </Td>
          </Tr>
        )}
      </AnimatePresence>
    </>
  )
}
