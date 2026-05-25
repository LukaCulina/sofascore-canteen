import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import useSWR from "swr"
import { getJson, putJson } from "@/api/http-client"
import { meal as mealRoute } from "@/api/routes"
import { IconArrowLeft, IconVeganMealSelector } from "@/components/icons"
import { Button, Checkbox, Input, Spinner, StatusMessage, Text } from "@/components/ui"
import { useAuthStore } from "@/stores/auth"
import { useToastStore } from "@/stores/toast"
import { css } from "@/styled-system/css"
import { Box, Flex } from "@/styled-system/jsx"
import type { Meal } from "@/types"

type MealForm = {
  description: string
  price: string
  discount: string
  is_vegetarian: boolean
}

const emptyForm: MealForm = { description: "", price: "", discount: "", is_vegetarian: false }

export const MealDetailsPage = () => {
  const { id } = useParams({ strict: false }) as { id: string }
  const navigate = useNavigate()
  const mealId = Number(id)

  const { token } = useAuthStore()
  const addToast = useToastStore((s) => s.addToast)
  const intl = useIntl()

  const [form, setForm] = useState<MealForm>(emptyForm)
  const [savedForm, setSavedForm] = useState<MealForm | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data, isLoading, error } = useSWR<{ meal: Meal }>(
    token ? mealRoute(mealId) : null,
    (url: string) => getJson<{ meal: Meal }>(url),
  )

  const mealData = data?.meal

  useEffect(() => {
    setForm(emptyForm)
    setSavedForm(null)
  }, [mealId])

  useEffect(() => {
    if (mealData) {
      const loaded: MealForm = {
        description: mealData.description ?? "",
        price: String(mealData.price ?? ""),
        discount: String(mealData.discount ?? ""),
        is_vegetarian: mealData.is_vegetarian ?? false,
      }
      setForm(loaded)
      setSavedForm(loaded)
    }
  }, [mealData])

  const isDirty = savedForm !== null && JSON.stringify(form) !== JSON.stringify(savedForm)
  const isValid =
    (form.description ?? "").trim() !== "" && form.price !== "" && form.discount !== ""

  const handleSubmit = async () => {
    if (!isDirty || !isValid || isSubmitting) return
    setIsSubmitting(true)
    try {
      await putJson(mealRoute(mealId), {
        description: form.description,
        price: Number(form.price),
        discount: Number(form.discount),
        is_vegetarian: form.is_vegetarian,
      })
      setSavedForm(form)
      addToast(intl.formatMessage({ id: "toast.mealUpdated" }), "success")
    } catch {
      addToast(intl.formatMessage({ id: "toast.mealUpdateFailed" }), "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      p="4xl"
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="0 auto"
      padding="0"
      maxW="768px"
      gap="xl"
    >
      <Box alignSelf="flex-start" display="inline-flex" alignItems="center" gap="xs">
        <Link
          to="/catering/catalog"
          className={css({
            display: "inline-flex",
            alignItems: "center",
            gap: "lg",
            color: "primary.default",
            textStyle: "body.large",
            textDecoration: "none",
            _hover: { textDecoration: "underline" },
          })}
        >
          <IconArrowLeft fill="primary.default" />
          <FormattedMessage id="mealDetails.backToCatalog" />
        </Link>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="md"
        alignSelf="flex-start"
      >
        <Text alignSelf="flex-start" textStyle="display.extraLarge" color="neutrals.nLv1">
          <FormattedMessage id="mealDetails.editMeal" />
        </Text>

        <Text textStyle="body.large" color="neutrals.nLv1">
          <FormattedMessage id="mealDetails.updateDetails" />
        </Text>
      </Box>

      {isLoading ? (
        <Flex justify="center" py="6xl">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center" py="6xl">
          <StatusMessage variant="error">
            <FormattedMessage id="mealDetails.failedToLoadMeal" />
          </StatusMessage>
        </Flex>
      ) : (
        <Box
          bg="surface.s1"
          borderRadius="lg"
          borderWidth="thin"
          borderStyle="solid"
          borderColor="neutrals.nLv4"
          w="100%"
        >
          <Flex direction={{ base: "column", md: "row" }}>
            <Box
              w={{ base: "100%", md: "380px" }}
              flexShrink="0"
              borderRightWidth={{ base: "0", md: "thin" }}
              borderRightStyle="solid"
              borderRightColor="neutrals.nLv4"
              borderBottomWidth={{ base: "thin", md: "0" }}
              borderBottomStyle="solid"
              borderBottomColor="neutrals.nLv4"
              bg="surface.s2"
            >
              <Box display="flex" flexDirection="column" gap="sm" position="relative" p="lg">
                <Text textStyle="body.medium" color="neutrals.nLv1">
                  <FormattedMessage id="mealDetails.mealImage" />
                </Text>
                <Box position="relative" w="100%" h="198px" borderRadius="lg" overflow="hidden">
                  {mealData?.image_url ? (
                    <img
                      src={mealData.image_url}
                      alt={mealData.description}
                      className={css({
                        w: "100%",
                        h: "198px",
                        objectFit: "cover",
                        borderRadius: "lg",
                        position: "relative",
                      })}
                    />
                  ) : (
                    <Box w="100%" bg="neutrals.nLv4" borderRadius="lg" />
                  )}
                  {mealData?.is_vegetarian && (
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
              </Box>
              <Flex direction="column" gap="lg" display={{ base: "none", md: "flex" }} p="lg">
                <Flex direction="column" gap="sm">
                  <Text textStyle="assistive.default" color="neutrals.nLv1">
                    <FormattedMessage id="mealDetails.uploadImage" />
                  </Text>
                  <Button variant="primary" w="100px" h="32px" disabled fontSize="xs">
                    <FormattedMessage id="mealDetails.chooseFile" />
                  </Button>
                </Flex>
                <Text textStyle="assistive.default" color="neutrals.nLv1">
                  <FormattedMessage id="mealDetails.or" />
                </Text>
                <Flex direction="column">
                  <Flex
                    direction="column"
                    bg="surface.s1"
                    py="5px"
                    px="lg"
                    gap="2xs"
                    borderWidth="thin"
                    borderRadius="sm"
                    borderColor="neutrals.nLv4"
                    width="352px"
                  >
                    <Text textStyle="assistive.default" color="neutrals.nLv3">
                      <FormattedMessage id="mealDetails.pasteImageUrl" />
                    </Text>
                    <Text textStyle="body.large" color="neutrals.nLv1">
                      https://images.unsplash.com/photo-14
                    </Text>
                  </Flex>
                  <Text textStyle="assistive.default" color="neutrals.nLv3" pl="lg">
                    <FormattedMessage id="mealDetails.leaveEmptyForNoImage" />
                  </Text>
                </Flex>
              </Flex>
            </Box>

            <Flex flex="1" direction="column" gap="xl" p="lg">
              <Input
                label={intl.formatMessage({ id: "mealDetails.mealName" })}
                name="description"
                value={form.description}
                onChange={(val) => setForm((f) => ({ ...f, description: val }))}
              />
              <Input
                label={intl.formatMessage({ id: "mealDetails.price" })}
                name="price"
                type="number"
                value={form.price}
                onChange={(val) => setForm((f) => ({ ...f, price: val }))}
                min="0"
                step="0.01"
              />
              <Input
                label={intl.formatMessage({ id: "mealDetails.discount" })}
                name="discount"
                type="number"
                value={form.discount}
                onChange={(val) => setForm((f) => ({ ...f, discount: val }))}
                min="0"
                max="100"
              />
              <Flex align="center" gap="lg">
                <Checkbox
                  checked={form.is_vegetarian}
                  onChange={(checked) => setForm((f) => ({ ...f, is_vegetarian: checked }))}
                  ariaLabel={intl.formatMessage({ id: "mealDetails.markVegetarian" })}
                />
                <Flex direction="column" gap="xs">
                  <Text textStyle="display.medium" color="neutrals.nLv1">
                    <FormattedMessage id="mealDetails.vegetarian" />
                  </Text>
                  <Text textStyle="assistive.default" color="neutrals.nLv3">
                    <FormattedMessage id="mealDetails.markVegetarian" />
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            align="center"
            justify="space-between"
            px="lg"
            py="md"
            borderTopWidth="thin"
            borderTopStyle="solid"
            borderTopColor="neutrals.nLv4"
            bg="surface.s2"
          >
            <Box>
              {isDirty && (
                <Text textStyle="assistive.default" color="status.error.default">
                  <FormattedMessage id="mealDetails.unsavedChanges" />
                </Text>
              )}
            </Box>
            <Flex gap="md">
              <Button
                variant="outline"
                w="auto"
                onClick={() => navigate({ to: "/catering/catalog" })}
              >
                <FormattedMessage id="common.cancel" />
              </Button>
              <Button
                variant="primary"
                w="auto"
                disabled={!isDirty || !isValid || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <FormattedMessage id="mealDetails.savingEllipsis" />
                ) : (
                  <FormattedMessage id="mealDetails.saveChanges" />
                )}
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  )
}
