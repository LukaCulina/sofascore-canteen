import { useState } from "react"
import { Dialog } from "@/components/dialog"
import { Text } from "@/components/ui"
import { Button } from "@/components/ui/Button"
import { Textarea } from "@/components/ui/Textarea/Textarea"
import { Box, Flex } from "@/styled-system/jsx"
import { token } from "@/styled-system/tokens"

interface FeedbackDialogProps {
  isOpen: boolean
  onClose: () => void
  mealName: string
  onSubmit: (data: { rating: number; feedback: string }) => void | Promise<void>
}

const Star = ({ filled, onClick }: { filled: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    type="button"
    style={{
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 0,
      lineHeight: 1,
    }}
  >
    {filled ? (
      <svg
        width="26"
        height="26"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Filled star</title>
        <path
          d="M10.2573 16.2923L5.07034 19.4203C4.877 19.5332 4.68334 19.5807 4.48934 19.5627C4.29534 19.5447 4.11978 19.4793 3.96267 19.3667C3.80534 19.2538 3.68389 19.1063 3.59834 18.9243C3.513 18.7423 3.49934 18.541 3.55734 18.3203L4.93434 12.4307L0.355002 8.46667C0.183891 8.318 0.0748914 8.14578 0.0280025 7.95C-0.0191086 7.75422 -0.00677528 7.564 0.0650025 7.37933C0.13678 7.19489 0.240225 7.04411 0.375336 6.927C0.510447 6.80989 0.695114 6.73333 0.929336 6.69733L6.97267 6.16933L9.319 0.607666C9.40434 0.400777 9.53378 0.247776 9.70734 0.148665C9.88089 0.0495542 10.0642 0 10.2573 0C10.4504 0 10.6338 0.0495542 10.8073 0.148665C10.9809 0.247776 11.1103 0.400777 11.1957 0.607666L13.542 6.16933L19.5853 6.69733C19.8196 6.73333 20.0042 6.80989 20.1393 6.927C20.2744 7.04411 20.3779 7.19489 20.4497 7.37933C20.5214 7.564 20.5338 7.75422 20.4867 7.95C20.4398 8.14578 20.3308 8.318 20.1597 8.46667L15.5803 12.4307L16.9573 18.3203C17.0153 18.541 17.0017 18.7423 16.9163 18.9243C16.8308 19.1063 16.7093 19.2538 16.552 19.3667C16.3949 19.4793 16.2193 19.5447 16.0253 19.5627C15.8313 19.5807 15.6377 19.5332 15.4443 19.4203L10.2573 16.2923Z"
          fill={token("colors.primary.default")}
        />
      </svg>
    ) : (
      <svg
        width="26"
        height="26"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Empty star</title>
        <path
          d="M6.05734 16.4743L10.2573 13.941L14.4573 16.5077L13.3573 11.7077L17.0573 8.50767L12.1907 8.07433L10.2573 3.541L8.324 8.041L3.45734 8.47433L7.15734 11.7077L6.05734 16.4743ZM10.2573 16.2923L5.07034 19.4203C4.877 19.5332 4.68334 19.5807 4.48934 19.5627C4.29534 19.5447 4.11978 19.4793 3.96267 19.3667C3.80534 19.2538 3.68389 19.1063 3.59834 18.9243C3.513 18.7423 3.49934 18.541 3.55734 18.3203L4.93434 12.4307L0.355002 8.46667C0.183891 8.318 0.0748914 8.14578 0.0280025 7.95C-0.0191086 7.75422 -0.00677528 7.564 0.0650025 7.37933C0.13678 7.19489 0.240225 7.04411 0.375336 6.927C0.510447 6.80989 0.695114 6.73333 0.929336 6.69733L6.97267 6.16933L9.319 0.607666C9.40434 0.400777 9.53378 0.247776 9.70734 0.148665C9.88089 0.0495542 10.0642 0 10.2573 0C10.4504 0 10.6338 0.0495542 10.8073 0.148665C10.9809 0.247776 11.1103 0.400777 11.1957 0.607666L13.542 6.16933L19.5853 6.69733C19.8196 6.73333 20.0042 6.80989 20.1393 6.927C20.2744 7.04411 20.3779 7.19489 20.4497 7.37933C20.5214 7.564 20.5338 7.75422 20.4867 7.95C20.4398 8.14578 20.3308 8.318 20.1597 8.46667L15.5803 12.4307L16.9573 18.3203C17.0153 18.541 17.0017 18.7423 16.9163 18.9243C16.8308 19.1063 16.7093 19.2538 16.552 19.3667C16.3949 19.4793 16.2193 19.5447 16.0253 19.5627C15.8313 19.5807 15.6377 19.5332 15.4443 19.4203L10.2573 16.2923Z"
          fill={token("colors.primary.default")}
        />
      </svg>
    )}
  </button>
)

export const FeedbackDialog = ({ isOpen, onClose, mealName, onSubmit }: FeedbackDialogProps) => {
  const [rating, setRating] = useState<number>(0)
  const [feedback, setFeedback] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit({ rating, feedback })
      setRating(0)
      setFeedback("")
      onClose()
    } catch (error) {
      console.error("Failed to submit feedback:", error)
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setRating(0)
    setFeedback("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <Dialog.Root onClose={handleClose}>
      <Dialog.Header>
        <Dialog.Title>{mealName}</Dialog.Title>
      </Dialog.Header>

      <Dialog.Content>
        <Flex direction="column" gap="lg" alignItems="center">
          <Text textStyle="display.small" display="block">
            Rating
          </Text>
          <Flex gap="sm" p="sm">
            {[1, 2, 3, 4, 5].map((starNum) => (
              <Star key={starNum} filled={starNum <= rating} onClick={() => setRating(starNum)} />
            ))}
          </Flex>
        </Flex>
      </Dialog.Content>
      <Dialog.Content>
        <Box>
          <Text textStyle="body.medium" mb="md" display="block">
            Feedback (optional)
          </Text>
          <Textarea
            placeholder="Any additional feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.currentTarget.value)}
            size="sm"
          />
        </Box>
      </Dialog.Content>

      <Dialog.Footer>
        <Flex gap="md">
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting || rating === 0}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Flex>
      </Dialog.Footer>
    </Dialog.Root>
  )
}
