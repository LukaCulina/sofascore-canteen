import { FormattedMessage } from "react-intl"
import { IconPlanner } from "@/components/icons"
import { Text } from "@/components/ui/Text"
import { Flex } from "@/styled-system/jsx"

export const PlannerHeader = () => {
  return (
    <Flex direction="column" gap="lg">
      <Flex align="center" gap="sm">
        <IconPlanner width="22" height="25" fill="primary.default" />
        <Text textStyle="display.extraLarge" color="neutrals.nLv1">
          <FormattedMessage id="planner.title" />
        </Text>
      </Flex>
      <Text textStyle="body.large" color="neutrals.nLv2">
        <FormattedMessage id="planner.description" />
      </Text>
    </Flex>
  )
}
