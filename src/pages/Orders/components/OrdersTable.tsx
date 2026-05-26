import { useMemo } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { Text } from "@/components/ui/Text"
import { Box, Flex } from "@/styled-system/jsx"
import type { Order } from "@/types"
import { GreyText, Table, TableContainer, TableWrapper, Td, Th, Tr } from "../styles"
import { OrderCard } from "./OrderCard"
import { OrderRow } from "./OrderRow"

export interface ProcessedOrder extends Pick<Order, "id" | "order_selection"> {
  user: string
  period: string
  submitted: string
  meals: number
  discount: number
  total: number
}

interface OrdersTableProps {
  orders: Order[]
  isEditing: boolean
  changes: Record<number, boolean>
  setChanges: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
}

export const OrdersTable = ({ orders, isEditing, changes, setChanges }: OrdersTableProps) => {
  const intl = useIntl()

  const formatDate = (timestamp: number) =>
    intl.formatDate(new Date(timestamp * 1000), {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

  const formatPeriod = (start: number, end: number) =>
    `${intl.formatDate(new Date(start * 1000), {
      month: "short",
      day: "numeric",
    })} - ${intl.formatDate(new Date(end * 1000), {
      month: "short",
      day: "numeric",
    })}`

  const processedOrders = useMemo<ProcessedOrder[]>(() => {
    return orders.map((order: Order) => {
      const numMeals = order.order_selection.length
      const totalPrice = order.order_selection.reduce(
        (sum, sel) => sum + (sel.meal.price * (100 - sel.meal.discount)) / 100,
        0,
      )
      const totalDiscount = order.order_selection.reduce(
        (sum, sel) => sum + (sel.meal.price * sel.meal.discount) / 100,
        0,
      )

      return {
        id: order.id,
        user: order.user?.name ?? String(order.user_id),
        period: formatPeriod(order.plan.period_start, order.plan.period_end),
        submitted: formatDate(order.submitted_at),
        meals: numMeals,
        discount: Number(totalDiscount.toFixed(2)),
        total: Number(totalPrice.toFixed(2)),
        order_selection: order.order_selection,
      }
    })
  }, [orders, intl.locale])

  const totals = useMemo(
    () =>
      processedOrders.reduce(
        (acc, order) => ({
          meals: acc.meals + order.meals,
          total: acc.total + order.total,
          discount: acc.discount + order.discount,
        }),
        { meals: 0, total: 0, discount: 0 },
      ),
    [processedOrders],
  )

  return (
    <Box>
      {/* Desktop View */}
      <TableWrapper hideBelow="lg">
        <TableContainer>
          <Table>
            <thead>
              <Tr>
                <Th w="72px" aria-label="Actions"></Th>
                <Th>
                  <FormattedMessage id="orders.orderId" />
                </Th>
                <Th>
                  <FormattedMessage id="orders.user" />
                </Th>
                <Th>
                  <FormattedMessage id="orders.period" />
                </Th>
                <Th>
                  <FormattedMessage id="orders.submitted" />
                </Th>
                <Th>
                  <FormattedMessage id="orders.meals" />
                </Th>
                <Th>
                  <FormattedMessage id="orders.discount" />
                </Th>
                <Th>
                  <FormattedMessage id="orders.total" />
                </Th>
              </Tr>
            </thead>
            <tbody>
              {processedOrders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  isEditing={isEditing}
                  changes={changes}
                  setChanges={setChanges}
                />
              ))}
              <Tr>
                <Td colSpan={5}>
                  <FormattedMessage id="orders.totals" />
                </Td>
                <Td>{totals.meals}</Td>
                <Td color="status.success.default">€{totals.discount.toFixed(2)}</Td>
                <Td textAlign="right">€{totals.total.toFixed(2)}</Td>
              </Tr>
            </tbody>
          </Table>
        </TableContainer>
      </TableWrapper>

      {/* Mobile View */}
      <Flex direction="column" gap="sm" hideFrom="lg">
        {processedOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            isEditing={isEditing}
            changes={changes}
            setChanges={setChanges}
          />
        ))}

        <Flex
          justify="space-between"
          align="center"
          p="lg"
          bg="surface.s1"
          borderWidth="thin"
          borderStyle="solid"
          borderColor="neutrals.nLv4"
          borderRadius="lg"
        >
          <Flex direction="row" align="end" gap="xl">
            <Text textStyle="display.medium">
              <FormattedMessage id="orders.totals" />
            </Text>
            <GreyText>
              <FormattedMessage id="orders.nMeals" values={{ count: totals.meals }} />
            </GreyText>
          </Flex>
          <Flex direction="column" align="end" gap="xs">
            <Text textStyle="display.large">€{totals.total.toFixed(2)}</Text>
            <Text textStyle="assistive.default" color="status.success.default">
              €{totals.discount.toFixed(2)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
