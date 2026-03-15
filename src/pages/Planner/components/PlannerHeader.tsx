import { IconPlanner } from "@/components/icons"
import { Text } from "@/components/ui/Text"
import { Flex } from "@/styled-system/jsx"

export const PlannerHeader = () => {
  return (
    <Flex direction="column" gap="lg">
      <Flex align="center" gap="sm">
        <IconPlanner width="22" height="25" />
        <Text textStyle="display.extraLarge" color="neutrals.nLv1">
          Menu Planner
        </Text>
      </Flex>
      <Text textStyle="body.large" color="neutrals.nLv2">
        Choose a date range and select meals from the catalog for each day. Employees will be able
        to choose from these options.
      </Text>
    </Flex>
  )
}
