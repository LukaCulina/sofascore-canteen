import { IconPlanner } from "@/components/icons"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Text } from "@/components/ui/Text"
import { Box, Flex } from "@/styled-system/jsx"

interface DateRangeSelectorProps {
  startDate: string
  endDate: string
  error: string
  hasDateRange: boolean
  onStartDateChange: (value: string) => void
  onEndDateChange: (value: string) => void
  onClear: () => void
  success?: boolean
  submitError?: string
  overlapError?: string
}

export const DateRangeSelector = ({
  startDate,
  endDate,
  error,
  hasDateRange,
  onStartDateChange,
  onEndDateChange,
  onClear,
  success,
  submitError,
  overlapError,
}: DateRangeSelectorProps) => {
  return (
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
          onChange={onStartDateChange}
          backgroundColor="surface.s1"
          endAdornment={<IconPlanner fill="neutrals.nLv1" />}
        />
        <Input
          label="End date"
          type="date"
          name="endDate"
          value={endDate}
          placeholder=" "
          onChange={onEndDateChange}
          backgroundColor="surface.s1"
          endAdornment={<IconPlanner fill="neutrals.nLv1" />}
        />
        {error && (
          <Text textStyle="assistive.default" color="status.alert">
            {error}
          </Text>
        )}
        {success && (
          <Flex align="center" gap="sm" p="lg" bg="status.success.highlight" borderRadius="sm">
            <Text textStyle="body.medium" color="status.success.default">
              Plan created successfully!
            </Text>
          </Flex>
        )}
        {submitError && (
          <Flex align="center" gap="sm" p="lg" bg="status.error.highlight" borderRadius="sm">
            <Text textStyle="body.medium" color="status.error.default">
              {submitError}
            </Text>
          </Flex>
        )}
        {hasDateRange && (
          <Button variant="outline" onClick={onClear}>
            Clear dates
          </Button>
        )}
        {overlapError && (
          <Flex align="center" gap="sm" p="lg" bg="status.error.highlight" borderRadius="sm">
            <Text textStyle="assistive.default" color="status.error.default">
              {overlapError}
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}
