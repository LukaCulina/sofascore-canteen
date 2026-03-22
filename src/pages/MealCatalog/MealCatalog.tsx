import { IconMealCatalog } from "@/components/icons"
import { MealCard } from "@/components/ui"
import { Text } from "@/components/ui/Text"
import { mockMeals } from "@/mocks/meals"
import { Box, Flex, Grid } from "@/styled-system/jsx"
import type { Meal } from "@/types"

export const MealCatalogPage = () => {
  const meals = mockMeals as Meal[]

  return (
    <Box p="xl">
      {/* Header */}
      <Flex align="center" gap="md" mb="sm">
        <IconMealCatalog />
        <Text textStyle="display.extraLarge" color="neutrals.nLv1">
          Meal Catalog
        </Text>
      </Flex>

      <Text textStyle="body.medium" color="neutrals.nLv3" mb="xl">
        Browse all available meals in the catalog.
      </Text>

      {/* Meal Grid */}
      <Grid
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap="lg"
      >
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </Grid>
    </Box>
  )
}
