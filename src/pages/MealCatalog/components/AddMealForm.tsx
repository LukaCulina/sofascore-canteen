import { useFormikContext } from "formik"
import { IconCheckbox, IconCheckboxFilled } from "@/components/icons"
import { Button, Input, Text } from "@/components/ui"
import { css } from "@/styled-system/css"
import { Box, Flex } from "@/styled-system/jsx"

export interface AddMealFormValues {
  name: string
  price: string
  isVegetarian: boolean
  imageUrl: string
}

const vegetarianLabelClass = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "sm",
  cursor: "pointer",
})

const checkboxWrapperClass = css({
  position: "relative",
  width: "17px",
  height: "17px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
})

const checkboxInputClass = css({
  appearance: "none",
  WebkitAppearance: "none",
  width: "17px",
  height: "17px",
  borderWidth: "thin",
  borderStyle: "solid",
  borderColor: "neutrals.nLv3",
  borderRadius: "xs",
  cursor: "pointer",
  backgroundColor: "surface.s1",
  _checked: {
    borderColor: "primary.default",
    backgroundColor: "primary.highlight",
  },
})

const checkboxIconClass = css({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  transition: "opacity 0.15s ease, transform 0.15s ease",
})

const checkboxIconUncheckedClass = css({
  opacity: 1,
  transform: "scale(1)",
  _peerChecked: {
    opacity: 0,
    transform: "scale(0.9)",
  },
})

const checkboxIconCheckedClass = css({
  opacity: 0,
  transform: "scale(0.9)",
  _peerChecked: {
    opacity: 1,
    transform: "scale(1)",
  },
})

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
        <label className={vegetarianLabelClass}>
          <span className={checkboxWrapperClass}>
            <input
              name="isVegetarian"
              type="checkbox"
              checked={values.isVegetarian}
              onChange={(e) => setFieldValue("isVegetarian", e.target.checked)}
              className={`${checkboxInputClass} peer`}
            />
            <span
              className={`${checkboxIconClass} ${checkboxIconUncheckedClass}`}
              aria-hidden="true"
            >
              <IconCheckbox width={17} height={17} />
            </span>
            <span className={`${checkboxIconClass} ${checkboxIconCheckedClass}`} aria-hidden="true">
              <IconCheckboxFilled width={17} height={17} />
            </span>
          </span>
          <Text textStyle="body.large" color="neutrals.nLv1">
            Vegetarian
          </Text>
        </label>
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
