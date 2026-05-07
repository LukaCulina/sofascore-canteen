import { Link } from "@tanstack/react-router"
import { useMemo } from "react"
import { IconPlanner } from "@/components/icons"
import { Spinner } from "@/components/ui/Spinner"
import { Text } from "@/components/ui/Text"
import { usePlans } from "@/pages/Planner/hooks/usePlans"
import { css } from "@/styled-system/css"
import { Flex } from "@/styled-system/jsx"
import { PlanAccordion } from "./components/PlanAccordion"

export const MyPlans = () => {
  const { plans, isLoading } = usePlans()

  const sorted = useMemo(() => [...plans].sort((a, b) => b.period_start - a.period_start), [plans])

  return (
    <Flex direction="column" gap="xl">
      {/* Header */}
      <Flex direction="column" gap="lg">
        <Flex align="center" gap="sm">
          <IconPlanner width="22" height="25" fill="primary.default" />
          <Text textStyle="display.extraLarge" color="neutrals.nLv1">
            My Plans
          </Text>
        </Flex>
        <Text textStyle="body.large" color="neutrals.nLv1">
          View and review all your created meal plans
        </Text>
      </Flex>

      {/* Loading */}
      {isLoading && (
        <Flex align="center" justify="center" p="2xl">
          <Spinner />
        </Flex>
      )}

      {/* Empty state */}
      {!isLoading && sorted.length === 0 && (
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
            No plans created yet.
          </Text>
          <Link
            to="/planner"
            className={css({
              textStyle: "display.small",
              color: "primary.default",
              textDecoration: "none",
              _hover: { textDecoration: "underline" },
            })}
          >
            Go to Menu Planner to create your first plan
          </Link>
        </Flex>
      )}

      {/* Plans list */}
      {!isLoading && sorted.length > 0 && (
        <Flex direction="column" gap="lg">
          {sorted.map((plan) => (
            <PlanAccordion key={plan.id} plan={plan} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}
