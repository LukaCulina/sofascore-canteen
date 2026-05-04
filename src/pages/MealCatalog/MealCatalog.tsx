import { useState } from "react"
import { meals as mealsRoute } from "@/api/routes"
import { IconMealCatalog, IconPlus } from "@/components/icons"
import { Button, MealCard, Spinner, StatusMessage } from "@/components/ui"
import { Text } from "@/components/ui/Text"
import { useAuthSWR } from "@/hooks/useAuthSWR"
import { Box, Flex, Grid } from "@/styled-system/jsx"
import type { Meals } from "@/types"
import { AddMealDialog, AddMealFormProvider } from "./components"

export const MealCatalogPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { data, isLoading, error, mutate } = useAuthSWR<Meals>(mealsRoute())

  const meals = data?.meals ?? []

  const closeAddMealDialog = () => {
    setIsAddDialogOpen(false)
  }

  return (
    <Box p="sm">
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify={{ base: "flex-start", lg: "space-between" }}
        align={{ base: "stretch", lg: "center" }}
        gap="lg"
        mb="xl"
      >
        <Flex direction="column" gap="sm">
          <Flex align="center" gap="sm">
            <IconMealCatalog fill="primary.default" height={32} width={32} />
            <Text textStyle="display.extraLarge" color="neutrals.nLv1">
              Meal Catalog
            </Text>
          </Flex>

          <Text textStyle="body.large" color="neutrals.nLv1">
            Browse all available meals in the catalog.
          </Text>
        </Flex>

        <Button
          w={{ base: "full", lg: "fit-content" }}
          onClick={() => {
            setIsAddDialogOpen(true)
          }}
        >
          <IconPlus width={13} height={13} />
          Add New Meal
        </Button>
      </Flex>

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

      <AddMealFormProvider onClose={closeAddMealDialog} onMealCreated={() => mutate()}>
        <AddMealDialog isOpen={isAddDialogOpen} onClose={closeAddMealDialog} />
      </AddMealFormProvider>
    </Box>
  )
}
