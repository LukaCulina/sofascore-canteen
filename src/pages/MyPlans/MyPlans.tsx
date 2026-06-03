import { Link } from "@tanstack/react-router"
import { useMemo } from "react"
import { FormattedMessage } from "react-intl"
import { IconPlanner } from "@/components/icons"
import { Spinner } from "@/components/ui/Spinner"
import { StatusMessage } from "@/components/ui/StatusMessage"
import { H1, Text } from "@/components/ui/Text"
import { usePlans } from "@/pages/Planner/hooks/usePlans"
import { css } from "@/styled-system/css"
import { Flex } from "@/styled-system/jsx"
import { PlanAccordion } from "./components/PlanAccordion"

export const MyPlans = () => {
  const { plans, isLoading, error, mutate } = usePlans()

  const sorted = useMemo(() => [...plans].sort((a, b) => b.period_start - a.period_start), [plans])

  return (
    <Flex direction="column" gap="xl">
      {/* Header */}
      <Flex direction="column" gap="lg">
        <Flex align="center" gap="sm">
          <IconPlanner width="22" height="25" fill="primary.default" />
          <H1>
            <FormattedMessage id="myPlans.title" />
          </H1>
        </Flex>
        <Text textStyle="body.large" color="neutrals.nLv1">
          <FormattedMessage id="myPlans.subtitle" />
        </Text>
      </Flex>

      {/* Loading */}
      {isLoading && (
        <Flex align="center" justify="center" p="2xl">
          <Spinner />
        </Flex>
      )}
      {/* Error state */}
      {error && (
        <Flex justify="center" align="center" py="6xl">
          <StatusMessage variant="error">
            <FormattedMessage id="myPlans.failedToLoad" />
          </StatusMessage>
        </Flex>
      )}

      {/* Empty state */}
      {!isLoading && !error && sorted.length === 0 && (
        <Flex
          align="center"
          justify="center"
          direction="column"
          gap="md"
          borderWidth="thin"
          borderStyle="solid"
          borderColor="neutrals.nLv4"
          borderRadius="md"
          p="2xl"
        >
          <IconPlanner width="34" height="38" fill="neutrals.nLv3" />
          <Text textStyle="body.medium" color="neutrals.nLv3">
            <FormattedMessage id="myPlans.noPlans" />
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
            <FormattedMessage id="myPlans.goToPlanner" />
          </Link>
        </Flex>
      )}

      {/* Plans list */}
      {!isLoading && !error && sorted.length > 0 && (
        <Flex direction="column" gap="lg">
          {sorted.map((plan) => (
            <PlanAccordion key={plan.id} plan={plan} onMutate={() => mutate()} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}
