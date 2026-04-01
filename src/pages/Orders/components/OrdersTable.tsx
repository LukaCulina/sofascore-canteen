import { useMemo } from "react"
import { useIntl } from "react-intl"
import useSWR from "swr"
import { getOrders } from "@/api/routes"
import { Spinner } from "@/components/ui"
import { Text } from "@/components/ui/Text"
import { Box } from "@/styled-system/jsx/box"
import { Flex } from "@/styled-system/jsx/flex"
import { GreyText, Table, Td, Th, Tr } from "../styles"
import type { ProcessedOrder, RawOrder } from "../types"
import { OrderCard } from "./OrderCard"
import { OrderRow } from "./OrderRow"

export const OrdersTable = () => {
  const intl = useIntl()

  const { data, isLoading, error } = useSWR<{ orders: RawOrder[] }>(getOrders())

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

  const orders = useMemo<ProcessedOrder[]>(() => {
    if (!data?.orders) return []

    return data.orders.map((order: RawOrder) => {
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
        user: order.user?.name ?? `${order.user_id}`,
        period: formatPeriod(order.plan.period_start, order.plan.period_end),
        submitted: formatDate(order.submitted_at),
        meals: numMeals,
        discount: Number(totalDiscount.toFixed(2)),
        total: Number(totalPrice.toFixed(2)),
        orderSelection: order.order_selection,
        hasUnpaid: order.order_selection.some((sel) => sel.unpaid),
      }
    })
  }, [data, intl.locale])

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

  if (isLoading) {
    return (
      <Flex justify="center" align="center" direction="column" p="4xl" gap="md">
        <Spinner />
        <Text>Loading...</Text>
      </Flex>
    )
  }

  if (error) {
    return (
      <Text textStyle="display.medium" color="status.error.default">
        Failed to load orders
      </Text>
    )
  }

  return (
    <Box>
      {/* Desktop View */}
      <Box
        overflowX="auto"
        display={{ base: "none", lg: "block" }}
        border="1px solid"
        borderColor="neutrals.nLv4"
        borderRadius="lg"
      >
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
              <Td color="status.success.default">€{totals.discount.toFixed(2)}</Td>
              <Td textAlign="right">€{totals.total.toFixed(2)}</Td>
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
          <Flex direction="row" align="end" gap="xl">
            <Text textStyle="display.medium">Totals</Text>
            <GreyText>{totals.meals} meals</GreyText>
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
