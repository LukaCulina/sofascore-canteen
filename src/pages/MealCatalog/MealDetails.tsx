import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import useSWR from "swr"
import { getJson, putJson } from "@/api/http-client"
import { mealFeedbackById, meal as mealRoute } from "@/api/routes"
import { IconArrowLeft, IconVeganMealSelector } from "@/components/icons"
import { Button, Checkbox, H1, Input, Spinner, StatusMessage, Text } from "@/components/ui"
import { useAuthStore } from "@/stores/auth"
import { useToastStore } from "@/stores/toast"
import { css } from "@/styled-system/css"
import { Box, Flex } from "@/styled-system/jsx"
import type { Feedback, Meal } from "@/types"

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
  const intl = useIntl()
  const mealId = Number(id)

  const { token } = useAuthStore()
  const addToast = useToastStore((s) => s.addToast)

  const [form, setForm] = useState<MealForm>(emptyForm)
  const [savedForm, setSavedForm] = useState<MealForm | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data, isLoading, error } = useSWR<{ meal: Meal }>(
    token ? mealRoute(mealId) : null,
    (url: string) => getJson<{ meal: Meal }>(url),
  )

  const { data: feedbackData, isLoading: feedbackLoading } = useSWR<{ feedback: Feedback[] }>(
    token && mealId ? mealFeedbackById(mealId) : null,
    (url: string) => getJson<{ feedback: Feedback[] }>(url),
  )

  const mealData = data?.meal
  const sortedFeedback =
    feedbackData?.feedback?.sort(
      (a, b) => new Date(b.created_at * 1000).getTime() - new Date(a.created_at * 1000).getTime(),
    ) ?? []

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
        <H1 alignSelf="flex-start">
          <FormattedMessage id="mealDetails.editMeal" />
        </H1>

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
          <Box display="grid" gridTemplateColumns={{ base: "1fr", lg: "1fr 1fr" }}>
            <Box
              minW="0"
              borderRightWidth={{ base: "0", lg: "thin" }}
              borderRightStyle="solid"
              borderRightColor="neutrals.nLv4"
              borderBottomWidth={{ base: "thin", lg: "0" }}
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
              <Flex direction="column" gap="lg" p="lg">
                <Flex direction="column" gap="sm">
                  <Text textStyle="assistive.default" color="neutrals.nLv1">
                    <FormattedMessage id="mealDetails.uploadImage" />
                  </Text>
                  <Button
                    type="button"
                    variant="primary"
                    w="fit-content"
                    textStyle="assistive.default"
                    disabled
                  >
                    <FormattedMessage id="mealDetails.chooseFile" />
                  </Button>
                </Flex>
                <Text textStyle="assistive.default" color="neutrals.nLv1">
                  <FormattedMessage id="mealDetails.or" />
                </Text>
                <Flex direction="column" gap="xs">
                  <Flex
                    direction="column"
                    bg="surface.s1"
                    py="5px"
                    px="lg"
                    gap="2xs"
                    borderWidth="thin"
                    borderRadius="sm"
                    borderColor="neutrals.nLv4"
                  >
                    <Text textStyle="assistive.default" color="neutrals.nLv3">
                      <FormattedMessage id="mealDetails.pasteImageUrl" />
                    </Text>
                    <Text textStyle="body.large" color="neutrals.nLv1" wordWrap="break-word">
                      https://images.unsplash.com/photo-14
                    </Text>
                  </Flex>
                  <Text textStyle="assistive.default" color="neutrals.nLv3" pl="lg">
                    <FormattedMessage id="mealDetails.leaveEmptyForNoImage" />
                  </Text>
                </Flex>
              </Flex>
            </Box>

            <Flex minW="0" direction="column" gap="xl" p="lg">
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
          </Box>

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
                type="button"
                variant="outline"
                w="auto"
                onClick={() => navigate({ to: "/catering/catalog" })}
              >
                <FormattedMessage id="common.cancel" />
              </Button>
              <Button
                type="button"
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
      {feedbackLoading ? (
        <Flex justify="center" py="2xl" w="100%">
          <Spinner />
        </Flex>
      ) : sortedFeedback.length > 0 ? (
        <Box w="100%" display="flex" flexDirection="column" gap="lg" py="lg">
          <Text textStyle="display.large" color="neutrals.nLv1">
            Recent Feedback
          </Text>

          <Box maxH="400px" overflowY="auto" display="flex" flexDirection="column" gap="lg" pr="sm">
            {sortedFeedback.map((review) => {
              const reviewDate = new Date(review.created_at * 1000)
              const formattedDate = intl.formatDate(reviewDate, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })

              return (
                <Box
                  key={review.id}
                  bg="surface.s1"
                  borderRadius="lg"
                  p="lg"
                  display="flex"
                  flexDirection="column"
                  gap="lg"
                >
                  <Flex justify="space-between" align="flex-start" gap="lg">
                    <Flex direction="column" gap="sm" flex="1">
                      <Text textStyle="display.small" color="neutrals.nLv1">
                        {review.user_display_name}
                      </Text>
                      <Text textStyle="body.medium" color="neutrals.nLv1">
                        {review.message}
                      </Text>
                    </Flex>
                    <Box
                      display="flex"
                      borderRadius="xl"
                      gap="xs"
                      py="xs"
                      pl="sm"
                      pr="md"
                      backgroundColor="surface.s2"
                      alignItems="center"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Star Rating</title>
                        <path
                          d="M11.9996 16.689L8.10939 19.035C7.96439 19.1196 7.81914 19.1552 7.67364 19.1417C7.52814 19.1282 7.39648 19.0792 7.27864 18.9947C7.16064 18.9101 7.06956 18.7995 7.00539 18.663C6.94139 18.5265 6.93114 18.3755 6.97464 18.21L8.00739 13.7927L4.57289 10.8197C4.44456 10.7082 4.36281 10.5791 4.32764 10.4322C4.29231 10.2854 4.30156 10.1427 4.35539 10.0042C4.40923 9.86589 4.48681 9.75281 4.58814 9.66498C4.68948 9.57714 4.82798 9.51973 5.00364 9.49273L9.53614 9.09673L11.2959 4.92548C11.3599 4.77031 11.457 4.65556 11.5871 4.58123C11.7173 4.50689 11.8548 4.46973 11.9996 4.46973C12.1445 4.46973 12.282 4.50689 12.4121 4.58123C12.5423 4.65556 12.6394 4.77031 12.7034 4.92548L14.4631 9.09673L18.9956 9.49273C19.1713 9.51973 19.3098 9.57714 19.4111 9.66498C19.5125 9.75281 19.5901 9.86589 19.6439 10.0042C19.6977 10.1427 19.707 10.2854 19.6716 10.4322C19.6365 10.5791 19.5547 10.7082 19.4264 10.8197L15.9919 13.7927L17.0246 18.21C17.0681 18.3755 17.0579 18.5265 16.9939 18.663C16.9297 18.7995 16.8386 18.9101 16.7206 18.9947C16.6028 19.0792 16.4711 19.1282 16.3256 19.1417C16.1801 19.1552 16.0349 19.1196 15.8899 19.035L11.9996 16.689Z"
                          fill="#C7921F"
                        />
                      </svg>

                      <Text textStyle="display.small" color="neutrals.nLv1">
                        {review.rating}
                      </Text>
                    </Box>
                  </Flex>

                  {review.message && (
                    <Text textStyle="body.small" color="neutrals.nLv3">
                      {formattedDate}
                    </Text>
                  )}
                </Box>
              )
            })}
          </Box>
        </Box>
      ) : null}{" "}
    </Box>
  )
}
