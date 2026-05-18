import { useFormikContext } from "formik"
import { Button, Checkbox, Input, Text } from "@/components/ui"
import { css } from "@/styled-system/css"
import { Box, Flex } from "@/styled-system/jsx"

export interface AddMealFormValues {
  name: string
  price: string
  isVegetarian: boolean
  imageUrl: string
}

export const AddMealForm = () => {
  const { values, touched, errors, setFieldValue, setFieldTouched } =
    useFormikContext<AddMealFormValues>()

  return (
    <Flex direction="column" gap="lg">
      <Box>
        <Input
          name="name"
          label="Meal Name"
          placeholder="e.g. Grilled Chicken Salad"
          value={values.name}
          required
          onChange={(value) => setFieldValue("name", value)}
          onBlur={() => setFieldTouched("name", true)}
        />
        {touched.name && errors.name ? (
          <Text mt="xs" textStyle="assistive.default" color="status.error.default">
            {errors.name}
          </Text>
        ) : null}
      </Box>

      <Box>
        <Input
          name="price"
          label="Price"
          placeholder="0,00"
          type="number"
          step="0.01"
          value={values.price}
          required
          onChange={(value) => setFieldValue("price", value)}
          onBlur={() => setFieldTouched("price", true)}
        />
        {touched.price && errors.price ? (
          <Text mt="xs" textStyle="assistive.default" color="status.error.default">
            {errors.price}
          </Text>
        ) : null}
      </Box>

      <Flex py="lg" alignItems="center" gap="sm">
        <Checkbox
          name="isVegetarian"
          label="Vegetarian"
          checked={values.isVegetarian}
          onChange={(checked) => setFieldValue("isVegetarian", checked)}
        />
      </Flex>

      <Flex direction="column" pb="lg" gap="lg">
        <Text textStyle="assistive.default" color="neutrals.nLv1">
          Upload image
        </Text>
        <Flex
          gap="sm"
          alignItems="center"
          role="group"
          aria-label="Image upload"
          aria-disabled="true"
        >
          <Button
            textStyle="assistive.default"
            type="button"
            variant="primary"
            disabled
            w="fit-content"
          >
            Choose file
          </Button>
          <input type="file" disabled className={css({ display: "none" })} />
        </Flex>
        <Text textStyle="assistive.default" color="neutrals.nLv1">
          or paste URL below
        </Text>
        <Input
          name="imageUrl"
          label="Image URL"
          placeholder="https://"
          value={values.imageUrl}
          onChange={(value) => setFieldValue("imageUrl", value)}
          onBlur={() => setFieldTouched("imageUrl", true)}
        />
        <Text textStyle="assistive.default" color="neutrals.nLv3">
          Leave empty for no image.
        </Text>
      </Flex>
    </Flex>
  )
}
