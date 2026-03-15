import { useState } from "react"
import { IconPlanner, IconVegan } from "@/components/icons"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Text } from "@/components/ui/Text"
import { mockMealOptions } from "@/mocks/mealOptions"
import { css } from "@/styled-system/css"
import { Box, Flex } from "@/styled-system/jsx"

const MAX_DAYS = 5

const allMeals = mockMealOptions.plan.planDay.flatMap((day) => day.dayMeal ?? [])

// Format Date object to "YYYY-MM-DD" string for date input
const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

// Calculate number of days between two dates (+1 to include start day)
const getDaysBetween = (start: string, end: string) => {
  const startMs = new Date(start).getTime()
  const endMs = new Date(end).getTime()
  return Math.floor((endMs - startMs) / (1000 * 60 * 60 * 24)) + 1
}

// Validate date range, returns error message or empty string
const validateRange = (start: string, end: string) => {
  if (!start || !end) return ""
  const startMs = new Date(start).getTime()
  const endMs = new Date(end).getTime()
  if (endMs < startMs) return "End date cannot be before start date."
  const days = getDaysBetween(start, end)
  if (days > MAX_DAYS) return "Selected period cannot be longer than 5 days."
  return ""
}

// Generate array of date strings between start and end
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
  // Track selected meals per date: { "2026-03-10": [4, 13], "2026-03-11": [2] }
  const [selectedMeals, setSelectedMeals] = useState<Record<string, number[]>>({})

  // Only compute date range if both dates are set and there's no error
  const dateRange = startDate && endDate && !error ? getDateRange(startDate, endDate) : []

  const handleStartDate = (value: string) => {
    setStartDate(value)
    setError(validateRange(value, endDate))
  }

  const handleEndDate = (value: string) => {
    setEndDate(value)
    setError(validateRange(startDate, value))
  }

  // Add or remove meal from selected list for a specific date
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

  // Reset all state
  const handleClear = () => {
    setStartDate("")
    setEndDate("")
    setError("")
    setSelectedMeals({})
  }

  return (
    <Flex direction="column" gap="xl">
      {/* Header */}
      <Flex direction="column" gap="lg">
        <Flex align="center" gap="sm">
          <IconPlanner width="22" height="25" fill="primary.default" />
          <Text textStyle="display.extraLarge" color="neutrals.nLv1">
            Menu Planner
          </Text>
        </Flex>
        <Text textStyle="body.large" color="neutrals.nLv2">
          Choose a date range and select meals from the catalog for each day. Employees will be able
          to choose from these options.
        </Text>
      </Flex>

      {/* Content — column on mobile, row on desktop */}
      <Flex align="flex-start" gap="xl" direction={{ base: "column", md: "row" }}>
        {/* Left — Date Range */}
        <Box minW={{ base: "100%", md: "388px" }} p="lg">
          <Text textStyle="display.medium" color="neutrals.nLv1" mb="md" display="block">
            Select Date Range
          </Text>
          <Flex direction="column" gap="lg">
            <Input
              label="Start date"
              type="date"
              name="startDate"
              value={startDate}
              placeholder=" "
              onChange={handleStartDate}
              backgroundColor="surface.s1"
              endAdornment={<IconPlanner fill="neutrals.nLv1" />}
            />
            <Input
              label="End date"
              type="date"
              name="endDate"
              value={endDate}
              placeholder=" "
              onChange={handleEndDate}
              backgroundColor="surface.s1"
              endAdornment={<IconPlanner fill="neutrals.nLv1" />}
            />
            {/* Show error if date range is invalid */}
            {error && (
              <Text textStyle="assistive.default" color="status.alert">
                {error}
              </Text>
            )}
            {/* Show clear button only when meals are loaded */}
            {dateRange.length > 0 && (
              <Button variant="outline" onClick={handleClear}>
                Clear dates
              </Button>
            )}
          </Flex>
        </Box>

        {/* Right — Meals */}
        <Box flex="1" p="lg" w={{ base: "100%", md: "auto" }}>
          <Text textStyle="display.medium" color="neutrals.nLv1" mb="md" display="block">
            Select meals for each day
          </Text>

          {/* Empty state — no dates selected */}
          {dateRange.length === 0 ? (
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
            // Render one card per selected day
            <Flex direction="column" gap="lg">
              {dateRange.map((date) => (
                <Box
                  key={date}
                  border="1px solid"
                  borderColor="neutrals.nLv4"
                  borderRadius="md"
                  overflow="hidden"
                  backgroundColor="surface.s1"
                >
                  {/* Day header — weekday badge + full date */}
                  <Flex
                    align="center"
                    gap="lg"
                    px="lg"
                    py="lg"
                    borderBottom="1px solid"
                    borderColor="neutrals.nLv4"
                  >
                    <Box bg="neutrals.nLv4" borderRadius="sm" p="sm" textAlign="center">
                      <Text textStyle="display.small" color="neutrals.nLv1">
                        {new Date(date)
                          .toLocaleDateString("en-US", { weekday: "short" })
                          .toUpperCase()}
                      </Text>
                    </Box>
                    <Flex direction="column">
                      <Text textStyle="display.small" color="neutrals.nLv1">
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
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

                  {/* Meal rows — same meals shown for each day */}
                  {allMeals.map((item) => {
                    const isSelected = selectedMeals[date]?.includes(item.meal.id) ?? false

                    return (
                      <Flex
                        key={`${date}-${item.meal.id}`}
                        align="center"
                        gap="lg"
                        px="lg"
                        py="lg"
                        borderBottom="1px solid"
                        borderColor="neutrals.nLv4"
                        _last={{ borderBottom: "none" }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleMeal(date, item.meal.id)}
                          className={css({
                            w: "17px",
                            h: "17px",
                            accentColor: "primary.default",
                            cursor: "pointer",
                            flexShrink: 0,
                          })}
                        />
                        <Flex align="center" gap="sm" flex="1">
                          <Text textStyle="body.medium" color="neutrals.nLv1">
                            {item.meal.description}
                          </Text>
                          <Text textStyle="body.medium" color="neutrals.nLv3">
                            €{item.meal.price.toFixed(2)}
                          </Text>
                          {/* Show vegan icon for vegetarian meals */}
                          {item.meal.isVegetarian && <IconVegan />}
                        </Flex>
                      </Flex>
                    )
                  })}
                </Box>
              ))}
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}
