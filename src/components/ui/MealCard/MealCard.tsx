import { FormattedMessage } from "react-intl"
import { IconVeganMealSelector } from "@/components/icons"
import { Badge, Text } from "@/components/ui"
import { css } from "@/styled-system/css"
import { Box, Flex } from "@/styled-system/jsx"
import type { Meal } from "@/types"

export const MealCard = ({ meal }: { meal: Meal }) => {
  const { description, price, is_vegetarian, discount, image_url } = meal

  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price

  return (
    <Box bg="surface.s1" borderRadius="sm" overflow="hidden" borderColor="neutrals.nLv4">
      {/* Image */}
      <Box position="relative" h="180px" bg="neutrals.nLv4">
        {image_url ? (
          <img
            src={image_url}
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
        {is_vegetarian && (
          <Flex
            position="absolute"
            top="sm"
            right="sm"
            align="center"
            gap="xs"
            px="sm"
            py="xs"
            bg="status.success.default"
            borderWidth="thin"
            borderStyle="solid"
            borderColor="overlay.darken1"
            borderRadius="xl"
          >
            <Flex align="center" justify="center" w="lg" h="lg">
              <IconVeganMealSelector fill="surface.s1" />
            </Flex>
            <Text textStyle="assistive.default" color="surface.s1">
              <FormattedMessage id="common.vegetarian" />
            </Text>
          </Flex>
        )}
      </Box>

      {/* Content */}
      <Box py="lg" px="sm">
        <Flex align="center" justify="space-between">
          <Flex direction="column" gap="sm">
            <Text textStyle="body.large" color="neutrals.nLv1">
              {description}
            </Text>

            {discount > 0 ? (
              <Flex align="center" gap="xs">
                <Text
                  textStyle="display.medium"
                  color="neutrals.nLv3"
                  textDecoration="line-through"
                >
                  €{price.toFixed(2)}
                </Text>
                <Text textStyle="display.medium" color="status.error.default">
                  €{discountedPrice.toFixed(2)}
                </Text>
              </Flex>
            ) : (
              <Text textStyle="display.medium" color="neutrals.nLv1">
                €{price.toFixed(2)}
              </Text>
            )}
          </Flex>

          {discount > 0 && (
            <Badge>
              <FormattedMessage id="common.discountOff" values={{ discount }} />
            </Badge>
          )}
        </Flex>
      </Box>
    </Box>
  )
}
