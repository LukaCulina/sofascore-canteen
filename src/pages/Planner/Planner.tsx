import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Box, Flex } from "@/styled-system/jsx"
import { Text } from "@/components/ui/Text"
import { IconPlanner } from "@/components/icons"
import { css } from "@/styled-system/css"
import { Button } from "@/components/ui/Button"

const MAX_DAYS = 5

const getDaysBetween = (start: string, end: string) => {
  const startMs = new Date(start).getTime()
  const endMs = new Date(end).getTime()
  return Math.floor((endMs - startMs) / (1000 * 60 * 60 * 24)) + 1
}

const getDateRange = (start: string, end: string): string[] => {
  const dates: string[] = []
  const current = new Date(start)
  const endDate = new Date(end)

  while (current <= endDate) {
    dates.push(current.toISOString().split("T")[0])
    current.setDate(current.getDate() + 1)
  }

  return dates
}

export const Planner = () => {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [error, setError] = useState("")

  const dateRange =
    startDate && endDate && !error ? getDateRange(startDate, endDate) : []

  const handleStartDate = (val: string) => {
    setStartDate(val)
    setError("")
    if (endDate && val) {
      const days = getDaysBetween(val, endDate)
      if (days > MAX_DAYS) setError("Selected period cannot be longer than 5 days.")
    }
  }

  const handleEndDate = (val: string) => {
    setEndDate(val)
    setError("")
    if (startDate && val) {
      const days = getDaysBetween(startDate, val)
      if (days > MAX_DAYS) setError("Selected period cannot be longer than 5 days.")
    }
  }

  return (
    <Flex direction="column" gap="xl">
      {/* Header */}
      <Flex direction="column" gap="lg">
        <Flex align="center" gap="sm">
          <IconPlanner width="22" height="25" className={css({ color: "primary.default" })} />
          <Text textStyle="display.extraLarge" color="neutrals.nLv1">
            Menu Planner
          </Text>
        </Flex>
        <Text textStyle="body.large" color="neutrals.nLv2">
          Choose a date range and select meals from the catalog for each day.
          Employees will be able to choose from these options.
        </Text>
      </Flex>

      {/* Content */}
      <Flex align="flex-start">
        {/* Left — Date Range */}
        <Box minW="388px" p="lg">
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
              endAdornment={<IconPlanner className={css({ color: "neutrals.nLv1" })} />}
            />
            <Input
              label="End date"
              type="date"
              name="endDate"
              value={endDate}
              placeholder=" "
              onChange={handleEndDate}
              backgroundColor="surface.s1"
              endAdornment={<IconPlanner className={css({ color: "neutrals.nLv1" })} />}
            />
            {error && (
              <Text textStyle="assistive.default" color="status.alert">
                {error}
              </Text>
            )}
            {dateRange.length > 0 && (
            <Button
                variant ="outline"
                onClick={() => {
                setStartDate("")
                setEndDate("")
                setError("")
                }}
            >
                Clear dates
            </Button>
            )}
          </Flex>
        </Box>

        {/* Right — Meals */}
        <Box flex="1" p="lg">
          <Text textStyle="display.medium" color="neutrals.nLv1" mb="md" display="block">
            Select meals for each day
          </Text>

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
              <IconPlanner width="34" height="38" className={css({ color: "neutrals.nLv3" })} />
              <Text textStyle="body.medium" color="neutrals.nLv3">
                Choose a start and end date to plan meals for that range.
              </Text>
            </Flex>
          ) : (
            <Flex direction="column" gap="lg">
              {dateRange.map((date) => (
                <Box
                  key={date}
                  border="1px solid"
                  borderColor="neutrals.nLv4"
                  borderRadius="md"
                  p="lg"
                >
                  <Text textStyle="display.small" color="neutrals.nLv1" display="block" mb="md">
                    {new Date(date).toLocaleDateString("hr-HR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Text>
                  {/* checkboxovi dolaze u koraku 3 */}
                </Box>
              ))}
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}