import { useAuthSWR } from "@/api/hooks"
import { meals as mealsRoute } from "@/api/routes"
import { IconMealCatalog } from "@/components/icons"
import { MealCard, Spinner, StatusMessage } from "@/components/ui"
import { Text } from "@/components/ui/Text"
import { Box, Flex, Grid } from "@/styled-system/jsx"
import type { Meals } from "@/types"

export const MealCatalogPage = () => {
  const { data, isLoading, error } = useAuthSWR<Meals>(mealsRoute())

  const meals = data?.meals ?? []

  return (
    <Box p="sm">
      <Flex align="center" gap="sm" mb="sm">
        <IconMealCatalog fill="primary.default" height={32} width={32} />
        <Text textStyle="display.extraLarge" color="neutrals.nLv1">
          Meal Catalog
        </Text>
      </Flex>

      <Box mb="xl">
        <Text textStyle="body.large" color="neutrals.nLv1">
          Browse all available meals in the catalog.
        </Text>
      </Box>

      {isLoading ? (
        <Flex justify="center" align="center" py="6xl">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center" align="center" py="6xl">
          <StatusMessage variant="error">Failed to load meals</StatusMessage>
        </Flex>
      ) : meals.length === 0 ? (
        <Flex justify="center" align="center" py="6xl">
          <StatusMessage variant="info">No meals available</StatusMessage>
        </Flex>
      ) : (
        <Grid
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap="lg"
        >
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </Grid>
      )}
    </Box>
  )
}
