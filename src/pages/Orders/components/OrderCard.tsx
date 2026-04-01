import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { IconArrowDown, IconArrowUp } from "@/components/icons"
import { P, Text } from "@/components/ui/"
import { Badge } from "@/components/ui/Badge"
import { Box, Flex } from "@/styled-system/jsx"
import { GreyText } from "../styles"
import type { ProcessedOrder } from "../types"
import { MealCard } from "./MealCard"

interface OrderCardProps {
  order: ProcessedOrder
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Flex
      direction="column"
      gap="lg"
      border="1px solid"
      borderColor="neutrals.nLv4"
      borderRadius="lg"
      overflow="hidden"
      bg={order.hasUnpaid ? "status.error.highlight" : "surface.s1"}
    >
      <Flex
        p="lg"
        justify="space-between"
        align="center"
        onClick={() => setIsExpanded(!isExpanded)}
        cursor="pointer"
      >
        <Flex direction="column" gap="sm">
          <Flex align="center" gap="md">
            <Text textStyle="display.medium">#{order.id}</Text>
            {order.hasUnpaid && <Badge>Not Paid</Badge>}
          </Flex>
          <Text textStyle="body.medium">{order.user}</Text>
          <Flex direction="column" gap="sm">
            <Flex gap="xl">
              <GreyText>{order.period}</GreyText>
              <GreyText>{order.meals} meals</GreyText>
            </Flex>
            <GreyText>{order.submitted}</GreyText>
          </Flex>
        </Flex>
        <Flex direction="column" align="end" gap="xs">
          <Text textStyle="display.small">€{order.total.toFixed(2)}</Text>
          <Text textStyle="assistive.default" color="status.success.default">
            €{order.discount.toFixed(2)}
          </Text>
          {isExpanded ? <IconArrowUp /> : <IconArrowDown />}
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
                {order.orderSelection.map((selection) => (
                  <MealCard key={selection.id} selection={selection} />
                ))}
              </Flex>
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </Flex>
  )
}
