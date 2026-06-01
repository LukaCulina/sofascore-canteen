import { useState } from "react"
import { useIntl } from "react-intl"
import useSWR from "swr"
import { getJson, requestJson } from "@/api/http-client"
import { mealFeedback } from "@/api/routes"
import { Badge, Button, P, Text } from "@/components/ui"
import { useAuthStore } from "@/stores/auth"
import { Box, Flex } from "@/styled-system/jsx"
import type { OrderSelection } from "@/types"
import { GreyText } from "../styles"
import { FeedbackDialog } from "./FeedbackDialog"

interface MealCardProps {
  selection: OrderSelection
  unpaid: boolean
}

export const MealCard = ({ selection, unpaid }: MealCardProps) => {
  const intl = useIntl()
  const { token } = useAuthStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { meal, plan_day } = selection

  const { data: feedbackData, mutate: refetchFeedback } = useSWR<{ orderSelectionIds: number[] }>(
    token ? mealFeedback() : null,
    (url: string) => getJson<{ orderSelectionIds: number[] }>(url),
  )

  const feedbackSent = feedbackData?.orderSelectionIds.includes(selection.id) ?? false

  const finalPrice = (meal.price * (100 - meal.discount)) / 100
  const formattedMealDate = intl.formatDate(new Date(plan_day.day * 1000), {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const isPastDate = plan_day.day * 1000 < Date.now()

  const handleFeedbackSubmit = async (data: { rating: number; feedback: string }) => {
    try {
      await requestJson("POST", mealFeedback(), {
        order_selection_id: selection.id,
        rating: data.rating,
        message: data.feedback || null,
      })
    } catch (error) {
      console.error("Failed to submit feedback:", error)
      throw error
    }
    void refetchFeedback()
  }

  return (
    <>
      <Flex
        direction="column"
        gap="sm"
        p="lg"
        bg={unpaid ? "status.error.highlight" : "surface.s1"}
        border="1px solid"
        borderColor={unpaid ? "status.error.default" : "neutrals.nLv4"}
        borderRadius="lg"
      >
        <Flex align="center" gap="sm">
          <GreyText>{formattedMealDate}</GreyText>
          {unpaid && <Badge>Not Paid</Badge>}
        </Flex>
        <Box>
          <P textStyle="display.small">{meal.description}</P>
          <GreyText>€{finalPrice.toFixed(2)}</GreyText>
        </Box>
        <Button
          variant="outline"
          px="md"
          width="fit-content"
          disabled={!isPastDate || feedbackSent}
          onClick={() => !feedbackSent && setIsDialogOpen(true)}
        >
          <Text
            textStyle="assistive.default"
            color={feedbackSent ? "neutrals.nLv3" : "primary.default"}
          >
            {feedbackSent ? "Feedback Sent" : "Leave Feedback"}
          </Text>
        </Button>
      </Flex>

      <FeedbackDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        mealName={meal.description}
        onSubmit={handleFeedbackSubmit}
      />
    </>
  )
}
