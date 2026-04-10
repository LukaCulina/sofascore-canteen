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
            borderColor="rgba(0, 0, 0, 0.25)"
            borderWidth="1px"
            borderStyle="solid"
            color="white"
            px="sm"
            py="xs"
            borderRadius="xl"
            align="center"
            gap="xs"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Meal is vegetarian"
            >
              <path
                d="M5.15 10C4.54633 10 3.97767 9.90067 3.444 9.702C2.91044 9.50322 2.42656 9.22606 1.99233 8.8705L0.834667 10.0115C0.743778 10.1038 0.628111 10.15 0.487667 10.15C0.347222 10.15 0.230833 10.1038 0.1385 10.0115C0.0461666 9.91928 0 9.80289 0 9.66233C0 9.52189 0.0461666 9.40628 0.1385 9.3155L1.2795 8.17433C0.923945 7.74022 0.646833 7.25361 0.448167 6.7145C0.249389 6.17528 0.15 5.60378 0.15 5C0.15 3.60422 0.634389 2.42194 1.60317 1.45317C2.57194 0.484389 3.75422 0 5.15 0H9.13717C9.41839 0 9.6575 0.0984997 9.8545 0.2955C10.0515 0.4925 10.15 0.73161 10.15 1.01283V5C10.15 6.39589 9.66561 7.57817 8.69683 8.54683C7.72806 9.51561 6.54578 10 5.15 10ZM5.15 9C6.26111 9 7.20556 8.61111 7.98333 7.83333C8.76111 7.05556 9.15 6.11111 9.15 5V1H5.15C4.03889 1 3.09444 1.38889 2.31667 2.16667C1.53889 2.94444 1.15 3.88889 1.15 5C1.15 5.46322 1.22522 5.90383 1.37567 6.32183C1.52611 6.73983 1.73506 7.11633 2.0025 7.45133L5.47183 3.98217C5.56272 3.88983 5.67839 3.84367 5.81883 3.84367C5.95928 3.84367 6.07628 3.89044 6.16983 3.984C6.27194 4.08611 6.323 4.20428 6.323 4.3385C6.323 4.47272 6.27133 4.5915 6.168 4.69483L2.69867 8.15767C3.03378 8.42522 3.41028 8.6325 3.82817 8.7795C4.24617 8.9265 4.68678 9 5.15 9Z"
                fill="white"
              />
            </svg>
            <Text textStyle="assistive.default" color="surface.s1">
              Vegetarian
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
            <Flex align="center" justify="center">
              <Box
                borderWidth="1px"
                borderStyle="solid"
                borderColor="#fff"
                bg="status.error.highlight"
                borderRadius="full"
                px="md"
                py="xs"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text textStyle="body.medium" color="status.error.default" whiteSpace="nowrap">
                  {discount}% off
                </Text>
              </Box>
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  )
}
