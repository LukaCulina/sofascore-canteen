import { useMemo } from "react"
import { useIntl } from "react-intl"
import { Text } from "@/components/ui/Text"
import { mockOrders } from "@/mocks/orders"
import { useAuthStore } from "@/stores/auth"
import { Box } from "@/styled-system/jsx/box"
import { Flex } from "@/styled-system/jsx/flex"
import { OrderCard } from "./OrderCard"
import { OrderRow } from "./OrderRow"
import { Table, Td, Th, Tr } from "./styles"
import type { ProcessedOrder, RawOrder } from "./types"

export const OrdersTable = () => {
  const { user } = useAuthStore()
  const intl = useIntl()

  const formatDate = (timestamp: number) =>
    intl.formatDate(new Date(timestamp), {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

  const formatPeriod = (start: number, end: number) =>
    `${intl.formatDate(new Date(start), {
      month: "short",
      day: "numeric",
    })} - ${intl.formatDate(new Date(end), {
      month: "short",
      day: "numeric",
    })}`

  const orders = useMemo<ProcessedOrder[]>(() => {
    if (!user?.id) return []

    return (
      mockOrders
        //.filter(order => order.userId === user.id)
        .map((order: RawOrder) => {
          const numMeals = order.orderSelection.length
          const totalPrice = order.orderSelection.reduce(
            (sum, sel) => sum + (sel.meal.price * (100 - sel.meal.discount)) / 100,
            0,
          )
          const totalDiscount = order.orderSelection.reduce(
            (sum, sel) => sum + (sel.meal.price * sel.meal.discount) / 100,
            0,
          )

          return {
            id: order.id,
            user: `${order.userId.slice(0, 8)}...`,
            period: formatPeriod(order.plan.periodStart, order.plan.periodEnd),
            submitted: formatDate(order.submittedAt),
            meals: numMeals,
            discount: Number(totalDiscount.toFixed(2)),
            total: Number(totalPrice.toFixed(2)),
            orderSelection: order.orderSelection,
          }
        })
    )
  }, [user?.id])

  const totals = useMemo(
    () =>
      orders.reduce(
        (acc, order) => ({
          meals: acc.meals + order.meals,
          total: acc.total + order.total,
          discount: acc.discount + order.discount,
        }),
        { meals: 0, total: 0, discount: 0 },
      ),
    [orders],
  )

  return (
    <Box>
      {/* Desktop View */}
      <Box overflowX="auto" display={{ base: "none", lg: "block" }}>
        <Table>
          <thead>
            <Tr>
              <Th w="72px"></Th>
              <Th>Order ID</Th>
              <Th>User</Th>
              <Th>Period</Th>
              <Th>Submitted</Th>
              <Th>Meals</Th>
              <Th>Discount</Th>
              <Th>Total</Th>
            </Tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
            <Tr>
              <Td colSpan={5}>Totals</Td>
              <Td>{totals.meals}</Td>
              <Td color="status.success.default">€{totals.discount}</Td>
              <Td textAlign="right">€{totals.total}</Td>
            </Tr>
          </tbody>
        </Table>
      </Box>

      {/* Mobile View */}
      <Flex direction="column" gap="sm" display={{ base: "flex", lg: "none" }}>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}

        <Flex
          p="lg"
          border="1px solid"
          borderColor="neutrals.nLv4"
          borderRadius="lg"
          bg="surface.s1"
          justify="space-between"
          align="center"
        >
          <Text textStyle="display.medium">Totals</Text>
          <Flex direction="column" align="end" gap="sm">
            <Text>{totals.meals} meals</Text>
            <Text textStyle="display.large">€{totals.total}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
