import { Text } from "@/components/ui/Text"
import { Box, Flex } from "@/styled-system/jsx"

import { MealRow } from "./MealRow"

interface Meal {
  id: number
  description: string
  price: number
  is_vegetarian: boolean
}

interface MealDayCardProps {
  date: string
  meals: Meal[]
  selectedMeals: number[]
  onToggleMeal: (mealId: number) => void
}

export const MealDayCard = ({ date, meals, selectedMeals, onToggleMeal }: MealDayCardProps) => {
  return (
    <Box
      border="1px solid"
      borderColor="neutrals.nLv4"
      borderRadius="md"
      overflow="hidden"
      backgroundColor="surface.s1"
    >
      {/* Day header */}
      <Flex
        align="center"
        gap="lg"
        px="lg"
        py="lg"
        borderBottom="1px solid"
        borderColor="neutrals.nLv4"
      >
        <Box bg="surface.s2" borderRadius="sm" p="sm" textAlign="center">
          <Text textStyle="display.small" color="neutrals.nLv1">
            {new Date(date).toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}
          </Text>
        </Box>
        <Flex direction="column">
          <Text textStyle="display.small" color="neutrals.nLv1">
            {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
          </Text>
          <Text textStyle="assistive.default" color="neutrals.nLv3">
            {new Date(date).toLocaleDateString("en-US", {
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
          onToggle={() => onToggleMeal(meal.id)}
        />
      ))}
    </Box>
  )
}
