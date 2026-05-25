import { useIntl } from "react-intl"
import { Text } from "@/components/ui/Text"
import { Box, Flex } from "@/styled-system/jsx"
import type { Meal } from "@/types"
import { MealRow } from "./MealRow"

interface MealDayCardProps {
  date: Date
  meals: Meal[]
  selectedMeals: number[]
  onToggleMeal?: (mealId: number) => void
  disabled?: boolean
  backgroundColor?: string
  showBorder?: boolean
  dayTextStyle?: string
}

export const MealDayCard = ({
  date,
  meals,
  selectedMeals,
  onToggleMeal,
  disabled,
  backgroundColor,
  showBorder = true,
  dayTextStyle,
}: MealDayCardProps) => {
  const intl = useIntl()

  return (
    <Box
      borderWidth={showBorder ? "thin" : undefined}
      borderStyle={showBorder ? "solid" : undefined}
      borderColor="neutrals.nLv4"
      borderRadius="md"
      overflow="hidden"
      backgroundColor={backgroundColor ?? "surface.s1"}
    >
      {/* Day header */}
      <Flex
        align="center"
        gap="lg"
        p="lg"
        borderBottomWidth="thin"
        borderBottomStyle="solid"
        borderColor="neutrals.nLv4"
      >
        <Box bg="surface.s2" borderRadius="sm" p="sm" textAlign="center">
          <Text textStyle={dayTextStyle ?? "display.small"} color="neutrals.nLv1">
            {intl.formatDate(date, { weekday: "short" }).toUpperCase()}
          </Text>
        </Box>
        <Flex direction="column">
          <Text textStyle={dayTextStyle ?? "display.small"} color="neutrals.nLv1">
            {intl.formatDate(date, { weekday: "long" })}
          </Text>
          <Text textStyle={dayTextStyle ?? "assistive.default"} color="neutrals.nLv3">
            {intl.formatDate(date, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </Flex>
      </Flex>

      {/* Meals list */}
      {meals.map((meal) => (
        <MealRow
          key={meal.id}
          meal={meal}
          isSelected={selectedMeals.includes(meal.id)}
          onToggle={() => onToggleMeal?.(meal.id)}
          disabled={disabled}
        />
      ))}
    </Box>
  )
}
