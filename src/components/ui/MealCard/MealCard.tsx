import { Text } from "@/components/ui/Text"
import { css } from "@/styled-system/css"
import { Box, Flex } from "@/styled-system/jsx"
import type { Meal } from "@/types"

export const MealCard = ({ meal }: { meal: Meal }) => {
  const { description, price, isVegetarian, discount, imageUrl } = meal

  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price

  return (
    <Box bg="surface.s1" borderRadius="sm" overflow="hidden" borderColor="neutrals.nLv4">
      {/* Image */}
      <Box position="relative" h="180px" bg="neutrals.nLv4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={description}
            className={css({
              w: "100%",
              h: "100%",
              objectFit: "cover",
            })}
          />
        ) : (
          <Box w="100%" h="100%" bg="neutrals.nLv4" />
        )}

        {/* Vegetarian Badge */}
        {isVegetarian && (
          <Flex
            position="absolute"
            top="sm"
            right="sm"
            bg="status.success.default"
            borderColor="status.success.border"
            borderWidth="1px"
            borderStyle="solid"
            color="white"
            px="sm"
            py="xs"
            borderRadius="xl"
            align="center"
          >
            <Text textStyle="assistive.default">Vegetarian</Text>
          </Flex>
        )}
      </Box>

      {/* Content */}
      <Box p="lg">
        <Text textStyle="body.large" color="neutrals.nLv1" display="block">
          {description}
        </Text>

        <Flex align="center" gap="sm" mt="xs">
          {discount > 0 ? (
            <>
              <Text
                textStyle="assistive.default"
                color="neutrals.nLv3"
                textDecoration="line-through"
              >
                €{price.toFixed(2)}
              </Text>
              <Text textStyle="body.medium" color="status.error.default">
                €{discountedPrice.toFixed(2)}
              </Text>
              <Text textStyle="assistive.default" color="status.error.default" ml="auto">
                {discount}% off
              </Text>
            </>
          ) : (
            <Text textStyle="body.medium" color="neutrals.nLv1">
              €{price.toFixed(2)}
            </Text>
          )}
        </Flex>
      </Box>
    </Box>
  )
}
