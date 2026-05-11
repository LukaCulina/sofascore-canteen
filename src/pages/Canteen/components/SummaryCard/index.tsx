import { useIntl } from "react-intl"
import { IconCancel } from "@/components/icons/IconCancel"
import { IconCircleCheckFilled } from "@/components/icons/IconCircleCheckFilled"
import { IconEdit } from "@/components/icons/IconEdit"
import { Button, Spinner, Text } from "@/components/ui"
import { Flex } from "@/styled-system/jsx"
import type { Order } from "@/types"

interface Props {
  order: Order
  onEdit: () => void
  onCancelOrder: () => void
  onTransferMeal: (selectionId: number) => void
  isDeleting?: boolean
}

export function SummaryCard({
  order,
  onEdit,
  onCancelOrder,
  onTransferMeal,
  isDeleting = false,
}: Readonly<Props>) {
  const { formatDate, formatTime } = useIntl()
  const submittedAt = new Date(order.submitted_at * 1000)

  const formattedDate = formatDate(submittedAt, { month: "long", day: "numeric", year: "numeric" })
  const formattedTime = formatTime(submittedAt, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
  const formatFullDay = (unixSec: number) =>
    formatDate(new Date(unixSec * 1000), { weekday: "long" })

  const formatShortDate = (unixSec: number) =>
    formatDate(new Date(unixSec * 1000), { month: "short", day: "numeric" })

  return (
    <Flex
      direction="column"
      bg="surface.s1"
      rounded="lg"
      divideY="thin"
      divideColor="neutrals.nLv4"
    >
      <Flex
        justifyContent="space-between"
        p="lg"
        gap={{ mdDown: "lg" }}
        direction={{ mdDown: "column" }}
      >
        <Flex gap="lg" alignItems="center">
          <IconCircleCheckFilled fill="status.success.default" />
          <Flex direction="column">
            <Text textStyle="display.small">Order Confirmed</Text>
            <Text textStyle="assistive.default" color="neutrals.nLv3">
              Submitted on {formattedDate} at {formattedTime}
            </Text>
          </Flex>
        </Flex>
        <Flex gap="lg" alignItems="center" direction={{ mdDown: "column" }}>
          <Button variant="outline" onClick={onEdit} disabled={isDeleting}>
            <IconEdit />
            <Text textStyle="assistive.default" color="primary.default">
              Edit
            </Text>
          </Button>
          <Button variant="error" minW="fit-content" onClick={onCancelOrder} disabled={isDeleting}>
            {isDeleting ? (
              <Flex alignItems="center" gap="sm">
                <Spinner size="sm" />
                Cancelling...
              </Flex>
            ) : (
              <>
                <IconCancel />
                <Text textStyle="assistive.default" color="surface.s1">
                  Cancel order
                </Text>
              </>
            )}
          </Button>
        </Flex>
      </Flex>
      {order.order_selection.map((selection) => {
        const isTransferred = selection.transfer != null
        
        return (
          <Flex
            key={selection.id}
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            gap="sm"
            p="lg"
          >
            <Flex direction="column" gap="xs" alignItems={{ base: "center", md: "start" }}>
              <Flex gap={{ base: "sm", md: "xs" }}>
                <Text textStyle="display.small">{formatFullDay(selection.plan_day.day)}</Text>
                <Text textStyle="assistive.default" color="neutrals.nLv3">
                  {formatShortDate(selection.plan_day.day)}
                </Text>
              </Flex>
              <Text textStyle="assistive.default">{selection.meal.description}</Text>
            </Flex>
            {isTransferred ? (
              <Flex alignItems="center" gap="xs">
                <Text textStyle="assistive.default" color="status.success.default">
                  Transferred to: {selection.transfer?.to_user_display_name ?? "Unknown Recipient"}
                </Text>
              </Flex>
            ) : (
              <Button
                variant="outline"
                onClick={() => onTransferMeal(selection.id)}
                disabled={isDeleting}
                w={{ base: "100%", md: "fit-content" }}
              >
                <Text textStyle="assistive.default" color="primary.default">
                  Transfer meal
                </Text>
              </Button>
            )}
          </Flex>
        )
      })}
    </Flex>
  )
}
