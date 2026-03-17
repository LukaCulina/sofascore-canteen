import { IconVegan } from "@/components/icons"
import { Text } from "@/components/ui/Text"
import { css } from "@/styled-system/css"
import { Flex } from "@/styled-system/jsx"

interface Meal {
  id: number
  description: string
  price: number
  isVegetarian: boolean
}

interface MealRowProps {
  meal: Meal
  isSelected: boolean
  onToggle: () => void
}

export const MealRow = ({ meal, isSelected, onToggle }: MealRowProps) => {
  return (
    <Flex
      align="center"
      gap="lg"
      px="lg"
      py="lg"
      borderBottom="1px solid"
      borderColor="neutrals.nLv4"
      _last={{ borderBottom: "none" }}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        className={css({
          w: "17px",
          h: "17px",
          accentColor: "primary.default",
          cursor: "pointer",
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
        {meal.isVegetarian && <IconVegan fill="status.success" />}
      </Flex>
    </Flex>
  )
}
