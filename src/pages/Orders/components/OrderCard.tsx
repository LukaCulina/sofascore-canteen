import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { IconArrowDown, IconArrowUp } from "@/components/icons"
import { Badge, Checkbox, P, Text } from "@/components/ui/"
import { Box, Flex } from "@/styled-system/jsx"
import { GreyText } from "../styles"
import { MealCard } from "./MealCard"
import type { ProcessedOrder } from "./OrdersTable"

interface OrderCardProps {
  order: ProcessedOrder
  isEditing: boolean
  changes: Record<number, boolean>
  setChanges: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
}

export const OrderCard = ({ order, isEditing, changes, setChanges }: OrderCardProps) => {
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

  const handleCardClick = () => {
    if (!isEditing) {
      setIsExpanded((prev) => !prev)
    } else {
      toggleAll(!isUnpaid)
    }
  }

  return (
    <Flex
      direction="column"
      gap="lg"
      bg={isUnpaid ? "status.error.highlight" : "surface.s1"}
      borderWidth="thin"
      borderStyle="solid"
      borderColor="neutrals.nLv4"
      borderRadius="lg"
      overflow="hidden"
    >
      <Flex direction="column" gap="sm" p="lg" onClick={handleCardClick} cursor="pointer">
        <Flex align="center" gap="md">
          <Text textStyle="display.medium">#{order.id}</Text>
          {isUnpaid && <Badge>Not Paid</Badge>}
        </Flex>

        <Flex justify="space-between" gap="sm">
          <Flex direction="column" gap="sm">
            <Text textStyle="body.medium">{order.user}</Text>
            <Flex columnGap="xl" wrap="wrap">
              <GreyText>{order.period}</GreyText>
              <GreyText>{order.meals} meals</GreyText>
            </Flex>
            <GreyText>{order.submitted}</GreyText>
          </Flex>

          <Flex direction="column" align="end" gap="xs">
            <Text textStyle="display.small">€{order.total.toFixed(2)}</Text>
            <Text textStyle="assistive.default" color="status.success.default">
              €{order.discount.toFixed(2)}
            </Text>
            {isEditing ? (
              <Checkbox
                checked={isUnpaid}
                onChange={toggleAll}
                ariaLabel={`Toggle payment status for order ${order.id}`}
              />
            ) : isExpanded ? (
              <IconArrowUp />
            ) : (
              <IconArrowDown />
            )}
          </Flex>
        </Flex>
      </Flex>

      <AnimatePresence>
        {isExpanded && (
          <Box p="md">
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <P textStyle="display.micro" mb="md">
                Meal Selections:
              </P>
              <Flex direction="column" gap="md">
                {order.order_selection.map((selection) => (
                  <MealCard
                    key={selection.id}
                    selection={selection}
                    unpaid={changes[selection.id] ?? selection.unpaid}
                  />
                ))}
              </Flex>
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </Flex>
  )
}
