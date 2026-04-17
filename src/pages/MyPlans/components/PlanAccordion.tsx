import { useState } from "react"
import { IconArrowDown } from "@/components/icons"
import { Text } from "@/components/ui/Text"
import { MealDayCard } from "@/pages/Planner/components"
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

const tsToDayDate = (timestamp: number) => {
  const d = new Date(timestamp * 1000)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
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
        <Flex direction="column" align="flex-start" gap="xs">
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

      {/* Expanded content — read-only */}
      <Box
        display="grid"
        gridTemplateRows={isOpen ? "1fr" : "0fr"}
        transition="grid-template-rows 0.6s ease"
      >
        <Box overflow="hidden">
          <Box p="lg">
            <Flex direction="column" gap="md">
              {plan.plan_day.map((day) => (
                <MealDayCard
                  key={day.id}
                  date={tsToDayDate(day.day)}
                  meals={day.day_meal.map((dm) => dm.meal)}
                  selectedMeals={day.day_meal.map((dm) => dm.meal.id)}
                  disabled
                  backgroundColor="surface.s2"
                  showBorder={false}
                  dayTextStyle="display.micro"
                />
              ))}
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
