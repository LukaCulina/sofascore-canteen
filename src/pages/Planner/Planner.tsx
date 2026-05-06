import { useState } from "react"
import { postJson } from "@/api/http-client"
import { plans } from "@/api/routes"
import { IconPlanner } from "@/components/icons"
import { Spinner, StatusMessage } from "@/components/ui"
import { Text } from "@/components/ui/Text"
import { Flex } from "@/styled-system/jsx"
import { DateRangeSelector, MealDayCard, PlannerHeader } from "./components"
import { PlannerFooter } from "./components/PlannerFooter"
import { useMeals } from "./hooks/useMeals"
import { usePlans } from "./hooks/usePlans"

const MAX_DAYS = 5

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const getDaysBetween = (start: string, end: string) => {
  const startMs = new Date(start).getTime()
  const endMs = new Date(end).getTime()
  return Math.floor((endMs - startMs) / (1000 * 60 * 60 * 24)) + 1
}

const validateRange = (start: string, end: string) => {
  if (!start || !end) return ""
  const startMs = new Date(start).getTime()
  const endMs = new Date(end).getTime()
  if (endMs < startMs) return "End date cannot be before start date."
  const days = getDaysBetween(start, end)
  if (days > MAX_DAYS) return "Selected period cannot be longer than 5 days."
  return ""
}

const getDateRange = (start: string, end: string): string[] => {
  if (!start || !end) return []
  const dates: string[] = []
  const current = new Date(start)
  const endDate = new Date(end)
  while (current <= endDate) {
    dates.push(formatDate(current))
    current.setDate(current.getDate() + 1)
  }
  return dates
}

export const Planner = () => {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [error, setError] = useState("")
  const [selectedMeals, setSelectedMeals] = useState<Record<string, number[]>>({})
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const dateRange = startDate && endDate && !error ? getDateRange(startDate, endDate) : []
  const { meals, isLoading, error: mealsError } = useMeals(dateRange.length > 0)

  const { plans: existingPlans } = usePlans()

  const hasOverlap =
    dateRange.length > 0 &&
    existingPlans.some((plan) => {
      const planStart = new Date(plan.period_start * 1000)
      const planEnd = new Date(plan.period_end * 1000)
      const newStart = new Date(startDate)
      const newEnd = new Date(endDate)
      return newStart <= planEnd && newEnd >= planStart
    })

  const handleStartDate = (value: string) => {
    setStartDate(value)
    setError(validateRange(value, endDate))
  }

  const handleEndDate = (value: string) => {
    setEndDate(value)
    setError(validateRange(startDate, value))
  }

  const toggleMeal = (date: string, mealId: number) => {
    setSelectedMeals((prev) => {
      const currentMeals = prev[date] ?? []
      const isSelected = currentMeals.includes(mealId)
      return {
        ...prev,
        [date]: isSelected ? currentMeals.filter((id) => id !== mealId) : [...currentMeals, mealId],
      }
    })
  }

  const handleClear = () => {
    setStartDate("")
    setEndDate("")
    setError("")
    setSelectedMeals({})
  }

  const isSubmitEnabled =
    dateRange.length > 0 &&
    !hasOverlap &&
    dateRange.every((date) => (selectedMeals[date] ?? []).length > 0)

  const handleSubmit = async () => {
    setSubmitError("")
    setSubmitSuccess(false)

    const body = {
      periodStart: startDate,
      periodEnd: endDate,
      days: dateRange.map((date) => ({
        date,
        meals: (selectedMeals[date] ?? []).map((id) => ({ existingMealId: id })),
      })),
    }

    try {
      await postJson(plans(), body)
      setSubmitSuccess(true)
      handleClear()
    } catch {
      setSubmitError("Failed to create plan. Please try again.")
    }
  }

  return (
    <Flex direction="column" gap="xl">
      <PlannerHeader />

      <Flex align="flex-start" gap="xl" direction={{ base: "column", lg: "row" }}>
        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          error={error}
          hasDateRange={dateRange.length > 0}
          onStartDateChange={handleStartDate}
          onEndDateChange={handleEndDate}
          onClear={handleClear}
          success={submitSuccess}
          submitError={submitError}
          overlapError={hasOverlap ? "A plan already exists for the selected dates." : ""}
        />

        {/* Right — Meals */}
        <Flex flex="1" p="lg" w={{ base: "100%", md: "auto" }} direction="column">
          <Text textStyle="display.medium" color="neutrals.nLv1" mb="md" display="block">
            Select meals for each day
          </Text>

          {isLoading ? (
            <Flex justify="center" align="center" py="6xl">
              <Spinner />
            </Flex>
          ) : mealsError ? (
            <Flex justify="center" align="center" py="6xl">
              <StatusMessage variant="error">Failed to load meals.</StatusMessage>
            </Flex>
          ) : dateRange.length === 0 ? (
            <Flex
              align="center"
              justify="center"
              direction="column"
              gap="md"
              border="1px solid"
              borderColor="neutrals.nLv4"
              borderRadius="md"
              p="2xl"
            >
              <IconPlanner width="34" height="38" fill="neutrals.nLv3" />
              <Text textStyle="body.medium" color="neutrals.nLv3">
                Choose a start and end date to plan meals for that range.
              </Text>
            </Flex>
          ) : (
            <Flex direction="column" gap="lg">
              {dateRange.map((date) => (
                <MealDayCard
                  key={date}
                  date={new Date(date)}
                  meals={meals}
                  selectedMeals={selectedMeals[date] ?? []}
                  onToggleMeal={(mealId) => toggleMeal(date, mealId)}
                />
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>
      {dateRange.length > 0 && !isLoading && (
        <PlannerFooter isSubmitEnabled={isSubmitEnabled} onSubmit={handleSubmit} />
      )}
    </Flex>
  )
}
