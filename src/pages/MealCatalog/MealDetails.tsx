import { Link, useNavigate, useParams } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { getJson, putJson } from "@/api/http-client"
import { meal as mealRoute } from "@/api/routes"
import { IconArrowLeft } from "@/components/icons/IconArrowLeft"
import { Spinner, StatusMessage } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Text } from "@/components/ui/Text"
import { useAuthStore } from "@/stores/auth"
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

  const { data, isLoading, error } = useSWR<{ meal: Meal }>(
    token ? mealRoute(mealId) : null,
    (url: string) => getJson<{ meal: Meal }>(url),
  )
  const mealData = data?.meal

  const [form, setForm] = useState<MealForm>(emptyForm)
  const [savedForm, setSavedForm] = useState<MealForm | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"success" | "error" | null>(null)

  useEffect(() => {
    setForm(emptyForm)
    setSavedForm(null)
    setSaveStatus(null)
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
      setSaveStatus(null)
    }
  }, [mealData])

  const isDirty = savedForm !== null && JSON.stringify(form) !== JSON.stringify(savedForm)
  const isValid =
    (form.description ?? "").trim() !== "" && form.price !== "" && form.discount !== ""

  const handleSubmit = async () => {
    if (!isDirty || !isValid || isSubmitting) return
    setIsSubmitting(true)
    setSaveStatus(null)
    try {
      await putJson(mealRoute(mealId), {
        description: form.description,
        price: Number(form.price),
        discount: Number(form.discount),
        is_vegetarian: form.is_vegetarian,
      })
      setSaveStatus("success")
      setSavedForm(form)
    } catch {
      setSaveStatus("error")
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
          Back to Catalog
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
          Edit Meal
        </Text>

        <Text textStyle="body.large" color="neutrals.nLv1">
          Update the details for this meal in the catalog.
        </Text>
      </Box>

      {isLoading ? (
        <Flex justify="center" py="6xl">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justify="center" py="6xl">
          <StatusMessage variant="error">Failed to load meal</StatusMessage>
        </Flex>
      ) : (
        <Box
          bg="surface.s1"
          borderRadius="lg"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="neutrals.nLv4"
          w="100%"
        >
          <Flex direction={{ base: "column", md: "row" }}>
            <Box
              w={{ base: "100%", md: "380px" }}
              flexShrink="0"
              borderRightWidth={{ base: "0", md: "1px" }}
              borderRightStyle="solid"
              borderRightColor="neutrals.nLv4"
              borderBottomWidth={{ base: "1px", md: "0" }}
              borderBottomStyle="solid"
              borderBottomColor="neutrals.nLv4"
              bg="surface.s2"
            >
              <Box display="flex" flexDirection="column" gap="sm" position="relative" p="lg">
                <Text textStyle="body.medium" color="neutrals.nLv1">
                  Meal Image
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
              </Box>
              <Flex direction="column" gap="lg" display={{ base: "none", md: "flex" }} p="lg">
                <Flex direction="column" gap="8px">
                  <Text textStyle="assistive.default" color="neutrals.nLv1">
                    Upload Image
                  </Text>
                  <Button variant="primary" w="100px" h="32px" disabled fontSize="xs">
                    Choose file
                  </Button>
                </Flex>
                <Text textStyle="assistive.default" color="neutrals.nLv1">
                  Or
                </Text>
                <Flex direction="column">
                  <Flex
                    direction="column"
                    bg="white"
                    py="5px"
                    px="lg"
                    gap="2xs"
                    borderWidth="1px"
                    borderRadius="sm"
                    borderColor="neutrals.nLv4"
                    width="352px"
                  >
                    <Text textStyle="assistive.default" color="neutrals.nLv3">
                      Paste Image URL
                    </Text>
                    <Text textStyle="body.large" color="neutrals.nLv1">
                      https://images.unsplash.com/photo-14
                    </Text>
                  </Flex>
                  <Text textStyle="assistive.default" color="neutrals.nLv3" pl="lg">
                    Leave Empty for no image
                  </Text>
                </Flex>
              </Flex>
            </Box>

            <Flex flex="1" direction="column" gap="xl" p="lg">
              <Input
                label="Meal Name"
                name="description"
                value={form.description}
                onChange={(val) => setForm((f) => ({ ...f, description: val }))}
              />
              <Input
                label="Price (€)"
                name="price"
                type="number"
                value={form.price}
                onChange={(val) => setForm((f) => ({ ...f, price: val }))}
                min="0"
                step="0.01"
              />
              <Input
                label="Discount (%)"
                name="discount"
                type="number"
                value={form.discount}
                onChange={(val) => setForm((f) => ({ ...f, discount: val }))}
                min="0"
                max="100"
              />
              <Flex align="center" gap="lg">
                <input
                  type="checkbox"
                  id="is_vegetarian"
                  checked={form.is_vegetarian}
                  onChange={(e) => setForm((f) => ({ ...f, is_vegetarian: e.target.checked }))}
                  className={css({ w: "16px", h: "16px", cursor: "pointer", flexShrink: "0" })}
                />
                <Flex direction="column" gap="xs">
                  <Text textStyle="display.medium" color="neutrals.nLv1">
                    Vegetarian
                  </Text>
                  <Text textStyle="assistive.default" color="neutrals.nLv3">
                    Mark this meal as a vegetarian option
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
            borderTopWidth="1px"
            borderTopStyle="solid"
            borderTopColor="neutrals.nLv4"
            bg="surface.s2"
          >
            <Box>
              {!isDirty && saveStatus === null && (
                <Text textStyle="assistive.default" color="status.error.default">
                  Unsaved changes
                </Text>
              )}
              {saveStatus === "success" && (
                <StatusMessage variant="success" size="sm">
                  Saved successfully
                </StatusMessage>
              )}
              {saveStatus === "error" && (
                <StatusMessage variant="error" size="sm">
                  Failed to save
                </StatusMessage>
              )}
            </Box>
            <Flex gap="md">
              <Button
                variant="outline"
                w="auto"
                onClick={() => navigate({ to: "/catering/catalog" })}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                w="auto"
                disabled={!isDirty || !isValid || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  )
}
