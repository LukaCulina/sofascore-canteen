import { useState } from "react"
import { IconArrowDown } from "@/components/icons"
import { Text } from "@/components/ui/Text"
import { Box, Flex } from "@/styled-system/jsx"
import type { Plan } from "@/types"

interface PlanAccordionProps {
  plan: Plan
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export const PlanAccordion = ({ plan }: PlanAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box borderRadius="md" overflow="hidden" bg="surface.s1">
      {/* Accordion header */}
      <Flex
        as="button"
        align="center"
        justify="space-between"
        w="full"
        px="lg"
        py="lg"
        bg="transparent"
        border="none"
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Flex direction="column" align="flex-start" gap="sm">
          <Text textStyle="display.small" color="neutrals.nLv1">
            Plan #{plan.id}
          </Text>
          <Text textStyle="assistive.default" color="neutrals.nLv3">
            {formatDate(plan.period_start)} - {formatDate(plan.period_end)}
          </Text>
        </Flex>
        <Box transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"} transition="transform 0.2s">
          <IconArrowDown fill="neutrals.nLv3" />
        </Box>
      </Flex>

      {/* Expanded content - TODO: read-only form */}
      {isOpen && (
        <Box p="lg">
          <Text textStyle="body.medium" color="neutrals.nLv3">
            Plan details placeholder
          </Text>
        </Box>
      )}
    </Box>
  )
}
