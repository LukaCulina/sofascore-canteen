import { useIntl } from "react-intl"
import { CancelIcon } from "@/components/icons/CancelIcon"
import { IconCircleCheckFilled } from "@/components/icons/IconCircleCheckFilled"
import { IconEdit } from "@/components/icons/IconEdit"
import { Button, Spinner, Text } from "@/components/ui"
import { Flex } from "@/styled-system/jsx"
import type { Order } from "@/types"

interface Props {
  order: Order
  onEdit: () => void
  onCancelOrder: () => void
  isDeleting?: boolean
}

export function SummaryCard({ order, onEdit, onCancelOrder, isDeleting = false }: Readonly<Props>) {
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
            Edit
          </Button>
          <Button variant="error" minW="fit-content" onClick={onCancelOrder} disabled={isDeleting}>
            {isDeleting ? (
              <Flex alignItems="center" gap="sm">
                <Spinner size="sm" />
                Cancelling...
              </Flex>
            ) : (
              <>
                <CancelIcon />
                Cancel order
              </>
            )}
          </Button>
        </Flex>
      </Flex>
      {order.order_selection.map((selection) => (
        <Flex key={selection.id} p="lg" direction="column" gap="xs">
          <Flex gap="xs">
            <Text textStyle="display.small">{formatFullDay(selection.plan_day.day)}</Text>
            <Text textStyle="assistive.default" color="neutrals.nLv3">
              {formatShortDate(selection.plan_day.day)}
            </Text>
          </Flex>
          <Text textStyle="display.small">{selection.meal?.description ?? "No Meal"}</Text>
        </Flex>
      ))}
    </Flex>
  )
}
