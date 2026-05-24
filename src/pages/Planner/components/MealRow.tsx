import { IconVegan } from "@/components/icons"
import { Checkbox } from "@/components/ui"
import { Text } from "@/components/ui/Text"
import { Box, Flex } from "@/styled-system/jsx"
import type { Meal } from "@/types"

interface MealRowProps {
  meal: Meal
  isSelected: boolean
  onToggle: () => void
  disabled?: boolean
}

export const MealRow = ({ meal, isSelected, onToggle, disabled }: MealRowProps) => {
  return (
    <Flex
      as="label"
      align="center"
      gap="lg"
      px="lg"
      py="lg"
      borderBottom="1px solid"
      borderColor="neutrals.nLv4"
      _last={{ borderBottom: "none" }}
      cursor={disabled ? "default" : "pointer"}
    >
      {disabled ? (
        isSelected ? (
          <Box w="8px" h="8px" borderRadius="full" bg="primary.default" flexShrink={0} />
        ) : null
      ) : (
        <Checkbox
          checked={isSelected}
          onChange={onToggle}
          ariaLabel={`Select ${meal.description}`}
        />
      )}
      <Flex align="center" gap="sm" flex="1">
        <Text textStyle="body.medium" color="neutrals.nLv1">
          {meal.description}
        </Text>
        <Text textStyle="body.medium" color="neutrals.nLv3">
          €{meal.price.toFixed(2)}
        </Text>
        {meal.is_vegetarian && <IconVegan fill="status.success.default" />}
      </Flex>
    </Flex>
  )
}
