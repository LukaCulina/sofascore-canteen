import { Button } from "@/components/ui/Button"
import { Text } from "@/components/ui/Text"
import { Flex } from "@/styled-system/jsx"

interface PlannerFooterProps {
  isSubmitEnabled: boolean
  onSubmit: () => void
}

export const PlannerFooter = ({ isSubmitEnabled, onSubmit }: PlannerFooterProps) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      p="lg"
      bg="surface.s1"
      borderTopWidth="thin"
      borderTopStyle="solid"
      borderTopColor="neutrals.nLv4"
      mx="-4xl"
      mb="-4xl"
    >
      {!isSubmitEnabled && (
        <Text textStyle="body.small" color="neutrals.nLv3">
          Select at least one meal for each day
        </Text>
      )}
      <Button onClick={onSubmit} disabled={!isSubmitEnabled} w="auto" ml="auto">
        Create Menu Plan
      </Button>
    </Flex>
  )
}
