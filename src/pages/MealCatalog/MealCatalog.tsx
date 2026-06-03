import { useNavigate } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { FormattedMessage } from "react-intl"
import useSWR from "swr"
import { getJson } from "@/api/http-client"
import { meals as mealsRoute } from "@/api/routes"
import { IconMealCatalog, IconPlus } from "@/components/icons"
import { Button, MealCard, Spinner, StatusMessage } from "@/components/ui"
import { H1, P } from "@/components/ui/Text"
import { useAuthStore } from "@/stores/auth"
import { Box, Flex, Grid } from "@/styled-system/jsx"
import type { Meals } from "@/types"
import { AddMealDialog, AddMealFormProvider } from "./components"
import { MealFilters } from "./MealFilters"

export const MealCatalogPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const navigate = useNavigate()
  const { token } = useAuthStore()
  const { data, isLoading, error, mutate } = useSWR<Meals>(
    token ? mealsRoute() : null,
    (url: string) => getJson<Meals>(url),
  )

  const meals = data?.meals ?? []

  const closeAddMealDialog = () => {
    setIsAddDialogOpen(false)
  }

  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({ vegetarian: false, nonVegetarian: false })

  const filteredMeals = useMemo(() => {
    let result = meals

    if (search) {
      result = result.filter((meal) =>
        meal.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (filters.vegetarian && !filters.nonVegetarian) {
      result = result.filter((meal) => meal.is_vegetarian)
    } else if (filters.nonVegetarian && !filters.vegetarian) {
      result = result.filter((meal) => !meal.is_vegetarian)
    }
    return result
  }, [meals, search, filters])

  return (
    <Flex direction="column" gap="xl">
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify={{ base: "flex-start", lg: "space-between" }}
        align={{ base: "stretch", lg: "center" }}
        gap="lg"
      >
        <Flex direction="column" gap="sm">
          <Flex align="center" gap="sm">
            <Flex align="center" justify="center" w="2xl" h="2xl">
              <IconMealCatalog width={32} height={32} />
            </Flex>
            <H1>
              <FormattedMessage id="mealCatalog.title" />
            </H1>
          </Flex>

          <P textStyle="body.large">
            <FormattedMessage id="mealCatalog.subtitle" />
          </P>
        </Flex>

        <Button
          w={{ base: "full", lg: "fit-content" }}
          onClick={() => {
            setIsAddDialogOpen(true)
          }}
        >
          <IconPlus width={13} height={13} />
          <FormattedMessage id="mealCatalog.addNewMeal" />
        </Button>
      </Flex>

      <MealFilters filters={filters} onSearchChange={setSearch} onFiltersChange={setFilters} />

      {isLoading ? (
        <Flex justify="center" align="center" py="6xl">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center" align="center" py="6xl">
          <StatusMessage variant="error">
            <FormattedMessage id="mealCatalog.failedToLoadMeals" />
          </StatusMessage>
        </Flex>
      ) : meals.length === 0 ? (
        <Flex justify="center" align="center" py="6xl">
          <StatusMessage variant="info">
            <FormattedMessage id="mealCatalog.noMealsAvailable" />
          </StatusMessage>
        </Flex>
      ) : filteredMeals.length === 0 ? (
        <Flex justify="center" align="center" py="6xl">
          <StatusMessage variant="info">
            <FormattedMessage id="mealCatalog.noMealsMatch" />
          </StatusMessage>
        </Flex>
      ) : (
        <Grid
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap="lg"
        >
          {filteredMeals.map((meal) => (
            <Box
              key={meal.id}
              cursor="pointer"
              onClick={() => navigate({ to: "/meals/$id", params: { id: String(meal.id) } })}
            >
              <MealCard meal={meal} />
            </Box>
          ))}
        </Grid>
      )}
      {isAddDialogOpen ? (
        <AddMealFormProvider onClose={closeAddMealDialog} onMealCreated={() => mutate()}>
          <AddMealDialog onClose={closeAddMealDialog} />
        </AddMealFormProvider>
      ) : null}
    </Flex>
  )
}
