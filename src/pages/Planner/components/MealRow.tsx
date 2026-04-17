import { IconVegan } from "@/components/icons"
import { Text } from "@/components/ui/Text"
import { css } from "@/styled-system/css"
import { Flex } from "@/styled-system/jsx"
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
      align="center"
      gap="lg"
      px="lg"
      py="lg"
      borderBottom="1px solid"
      borderColor="neutrals.nLv4"
      _last={{ borderBottom: "none" }}
      cursor={disabled ? "default" : "pointer"}
      onClick={disabled ? undefined : onToggle}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        disabled={disabled}
        className={css({
          w: "17px",
          h: "17px",
          accentColor: disabled ? "neutrals.nLv3" : "primary.default",
          cursor: disabled ? "not-allowed" : "pointer",
          flexShrink: 0,
        })}
      />
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
