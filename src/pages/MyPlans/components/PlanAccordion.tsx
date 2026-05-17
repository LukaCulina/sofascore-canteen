import { useState } from "react"
import { Dialog } from "@/components/dialog"
import { IconArrowDown, IconPen, IconTrash } from "@/components/icons"
import { Button } from "@/components/ui/Button"
import { Text } from "@/components/ui/Text"
import { MealDayCard } from "@/pages/Planner/components"
import { useMeals } from "@/pages/Planner/hooks/useMeals"
import { Box, Flex } from "@/styled-system/jsx"
import type { Plan } from "@/types"
import { usePlanActions } from "../hooks/usePlanActions"

interface PlanAccordionProps {
  plan: Plan
  onMutate: () => void
}

const formatDate = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

export const PlanAccordion = ({ plan, onMutate }: PlanAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const isFuturePlan = plan.period_start * 1000 > Date.now()

  const {
    isEditing,
    setIsEditing,
    showConfirm,
    setShowConfirm,
    editedMeals,
    toggleMeal,
    handleCancelEdit,
    deletePlan,
    savePlan,
  } = usePlanActions(plan, onMutate)

  const { meals } = useMeals(isEditing)

  return (
    <Box borderRadius="md" overflow="hidden" bg="surface.s1">
      <Flex
        align="center"
        justify="space-between"
        p="lg"
        gap="lg"
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
        flexWrap="wrap"
      >
        <Flex
          direction="column"
          align="flex-start"
          gap="xs"
          w={{ base: "100%", sm: "auto" }}
          flex="1"
          minW="0"
        >
          <Text textStyle="display.small" color="neutrals.nLv1">
            Plan #{plan.id}
          </Text>
          <Text textStyle="assistive.default" color="neutrals.nLv3">
            {formatDate(plan.period_start)} - {formatDate(plan.period_end)}
          </Text>
        </Flex>

        <Flex align="center" gap="md">
          {isFuturePlan && !isEditing && (
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
                  setIsEditing(true)
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
                  setShowConfirm(true)
                }}
              >
                <IconTrash fill="surface.s1" width="20px" height="20px" />
                <Box display={{ base: "none", sm: "block" }}>Delete Plan</Box>
              </Button>
            </Flex>
          )}

          {isFuturePlan && isEditing && (
            <Flex align="center" gap="md" onClick={(e) => e.stopPropagation()}>
              <Button
                variant="outline"
                w="auto"
                disabled={savePlan.isLoading}
                onClick={(e) => {
                  e.stopPropagation()
                  handleCancelEdit()
                }}
              >
                Cancel
              </Button>
              <Button
                w="auto"
                disabled={savePlan.isLoading}
                onClick={(e) => {
                  e.stopPropagation()
                  savePlan.execute()
                }}
              >
                {savePlan.isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </Flex>
          )}

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
                  meals={isEditing ? meals : day.day_meal.map((dm) => dm.meal)}
                  selectedMeals={editedMeals[day.id] ?? []}
                  onToggleMeal={isEditing ? (mealId) => toggleMeal(day.id, mealId) : undefined}
                  disabled={!isEditing}
                  backgroundColor="surface.s2"
                  showBorder={false}
                  dayTextStyle="display.micro"
                />
              ))}
            </Flex>
          </Box>
        </Box>
      </Box>

      {showConfirm && (
        <Dialog.Root onClose={() => setShowConfirm(false)}>
          <Dialog.Header>
            <Dialog.Title>Delete Plan</Dialog.Title>
          </Dialog.Header>
          <Dialog.Content>
            <Text textStyle="body.medium" color="neutrals.nLv1">
              Are you sure you want to delete this plan? This action cannot be undone.
            </Text>
            {deletePlan.error && (
              <Text
                textStyle="assistive.default"
                color="status.error.default"
                display="block"
                mt="md"
              >
                {deletePlan.error}
              </Text>
            )}
          </Dialog.Content>
          <Dialog.Footer>
            <Flex gap="md">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                disabled={deletePlan.isLoading}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={deletePlan.execute} disabled={deletePlan.isLoading}>
                {deletePlan.isLoading ? "Deleting..." : "Yes, delete"}
              </Button>
            </Flex>
          </Dialog.Footer>
        </Dialog.Root>
      )}
    </Box>
  )
}
