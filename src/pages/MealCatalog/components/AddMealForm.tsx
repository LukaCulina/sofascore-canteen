import { useFormikContext } from "formik"
import { FormattedMessage, useIntl } from "react-intl"
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
  const intl = useIntl()

  return (
    <Flex direction="column" gap="lg">
      <Box>
        <Input
          name="name"
          label={intl.formatMessage({ id: "addMeal.mealName" })}
          placeholder={intl.formatMessage({ id: "addMeal.mealNamePlaceholder" })}
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
          label={intl.formatMessage({ id: "addMeal.price" })}
          placeholder={intl.formatMessage({ id: "addMeal.pricePlaceholder" })}
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
          label={intl.formatMessage({ id: "addMeal.vegetarian" })}
          checked={values.isVegetarian}
          variant="primary"
          onChange={(checked) => setFieldValue("isVegetarian", checked)}
        />
      </Flex>

      <Flex direction="column" pb="lg" gap="lg">
        <Text textStyle="assistive.default" color="neutrals.nLv1">
          <FormattedMessage id="addMeal.uploadImage" />
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
            <FormattedMessage id="addMeal.chooseFile" />
          </Button>
          <input type="file" disabled className={css({ display: "none" })} />
        </Flex>
        <Text textStyle="assistive.default" color="neutrals.nLv1">
          <FormattedMessage id="addMeal.orPasteUrl" />
        </Text>
        <Input
          name="imageUrl"
          label={intl.formatMessage({ id: "addMeal.imageUrl" })}
          placeholder="https://"
          value={values.imageUrl}
          onChange={(value) => setFieldValue("imageUrl", value)}
          onBlur={() => setFieldTouched("imageUrl", true)}
        />
        <Text textStyle="assistive.default" color="neutrals.nLv3">
          <FormattedMessage id="addMeal.leaveEmpty" />
        </Text>
      </Flex>
    </Flex>
  )
}
