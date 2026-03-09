import { useCallback, useId } from "react"
import { IconRadioFilled, IconVegan } from "@/components/icons"
import { Text } from "@/components/ui"
import { formatPrice } from "@/lib/formatPrice"
import { Flex } from "@/styled-system/jsx"
import * as S from "./MealItem.styles.ts"

interface MealItemProps {
  title: string
  checked: boolean
  onChange: (mealId: number | null) => void
  mealId: number | null
  description?: string
  price?: number
  image?: string
  isVegan?: boolean
  isNoMeal?: boolean
}
export function MealItem({
  checked,
  onChange,
  mealId,
  title,
  description,
  price,
  image,
  isVegan,
  isNoMeal = false,
}: Readonly<MealItemProps>) {
  const itemId = useId()
  const handleChange = useCallback(() => onChange(mealId), [onChange, mealId])

  return (
    <S.MealItem
      p="lg"
      justifyItems="center"
      gap="lg"
      bg="surface.s1"
      className={isNoMeal ? "no-meal" : undefined}
      htmlFor={itemId}
    >
      <Flex p="sm" rounded="sm">
        <S.RadioWrap>
          <S.MealItemRadio
            id={itemId}
            checked={checked}
            onChange={handleChange}
            type="radio"
            aria-label={title}
            aria-checked={checked}
          />
          <S.RadioIcon className="radioIcon">
            <IconRadioFilled width={19} height={19} />
          </S.RadioIcon>
        </S.RadioWrap>
      </Flex>
      <Flex gap="lg">
        {image && (
          <S.MealImage
            src={image}
            alt={title}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null
              currentTarget.src = "https://placehold.net/400x400.png" // use local image to prevent infinite onError?
            }}
          />
        )}
        <Flex direction="column">
          <Flex gap="xs" alignItems="center">
            <Text textStyle="display.small">{title}</Text>
            {isVegan && <IconVegan />}
          </Flex>
          {description && (
            <Text textStyle="assistive.default" color="neutrals.nLv3">
              {description}
            </Text>
          )}
          {price && (
            <Text textStyle="assistive.default" color="neutrals.nLv3">
              {formatPrice(price)}
            </Text>
          )}
        </Flex>
      </Flex>
    </S.MealItem>
  )
}
