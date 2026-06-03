import { FormattedMessage } from "react-intl"
import { IconPlanner } from "@/components/icons"
import { H1, Text } from "@/components/ui/Text"
import { Flex } from "@/styled-system/jsx"

export const PlannerHeader = () => {
  return (
    <Flex direction="column" gap="lg">
      <Flex align="center" gap="sm">
        <IconPlanner width="22" height="25" fill="primary.default" />
        <H1>
          <FormattedMessage id="planner.title" />
        </H1>
      </Flex>
      <Text textStyle="body.large" color="neutrals.nLv2">
        <FormattedMessage id="planner.description" />
      </Text>
    </Flex>
  )
}
