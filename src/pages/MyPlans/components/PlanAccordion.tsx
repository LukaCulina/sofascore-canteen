import { useState } from "react"
import { IconArrowDown, IconPen, IconTrash } from "@/components/icons"
import { Button } from "@/components/ui/Button"
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

export const PlanAccordion = ({ plan }: PlanAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box borderRadius="md" overflow="hidden" bg="surface.s1">
      <Flex
        align="center"
        justify="space-between"
        p="lg"
        gap="lg"
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
        flexWrap={{ base: "wrap", md: "nowrap" }}
      >
        {/* left side — Plan ID and dates */}
        <Flex direction="column" align="flex-start" gap="xs" flex="1" minW="0">
          <Text textStyle="display.small" color="neutrals.nLv1">
            Plan #{plan.id}
          </Text>
          <Text textStyle="assistive.default" color="neutrals.nLv3">
            {formatDate(plan.period_start)} - {formatDate(plan.period_end)}
          </Text>
        </Flex>

        <Flex align="center" gap="md">
          <Flex
            align="center"
            gap="md"
            visibility={isOpen ? "visible" : "hidden"}
            opacity={isOpen ? 1 : 0}
            pointerEvents={isOpen ? "auto" : "none"}
            transition="opacity 0.2s"
            aria-hidden={!isOpen}
          >
            <Button
              variant="outline"
              w="auto"
              minW={{ base: "40px", md: "auto" }}
              px={{ base: "sm", md: "lg" }}
              tabIndex={isOpen ? 0 : -1}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <IconPen fill="primary.default" />
              <Box display={{ base: "none", sm: "block" }}>Edit</Box>
            </Button>
            <Button
              variant="danger"
              w="auto"
              minW={{ base: "40px", md: "auto" }}
              px={{ base: "sm", md: "lg" }}
              tabIndex={isOpen ? 0 : -1}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <IconTrash fill="surface.s1" width="20px" height="20px" />
              <Box display={{ base: "none", sm: "block" }}>Delete Plan</Box>
            </Button>
          </Flex>
          <Box transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"} transition="transform 0.2s">
            <IconArrowDown fill="neutrals.nLv3" />
          </Box>
        </Flex>
      </Flex>

      <Box
        display="grid"
        gridTemplateRows={isOpen ? "1fr" : "0fr"}
        transition="grid-template-rows 0.3s ease"
      >
        <Box overflow="hidden">
          <Box p="lg">
            <Flex direction="column" gap="md">
              {plan.plan_day.map((day) => (
                <MealDayCard
                  key={day.id}
                  date={new Date(day.day * 1000)}
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
