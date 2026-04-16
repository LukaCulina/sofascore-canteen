import useSWR from "swr"
import { getOrders } from "@/api/routes"
import { IconOrders, IconPen } from "@/components/icons"
import { Button, H1, LoadingSpinner, P, StatusMessage, Text } from "@/components/ui"
import { Flex } from "@/styled-system/jsx"
import type { Order } from "@/types/orders"
import { OrdersTable } from "./components/OrdersTable"

export const Orders = () => {
  const { data, isLoading, error } = useSWR<{ orders: Order[] }>(getOrders())

  return (
    <Flex direction="column" gap="xl">
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        align="center"
        gap={{ base: "lg", lg: "4xl" }}
      >
        <Flex direction="column" gap="lg">
          <Flex align="center" gap="sm">
            <Flex align="center" justify="center" w="2xl" h="2xl">
              <IconOrders width={28} height={28} />
            </Flex>
            <H1 fontSize="28px">All Orders</H1>
          </Flex>
          <P textStyle="body.large">View all employee meal orders across all periods.</P>
        </Flex>
        <Button
          variant="outline"
          w={{ base: "100%", lg: "fit-content" }}
          disabled={!data || data.orders.length === 0}
        >
          <Flex direction="row" gap="sm" align="center">
            <Flex align="center" justify="center" w="2xl" h="2xl">
              <IconPen />
            </Flex>
            <Text textStyle="label.medium" color="primary.default">
              Edit Payment Status
            </Text>
          </Flex>
        </Button>
      </Flex>

      {isLoading ? (
        <LoadingSpinner />
      ) : error || !data ? (
        <StatusMessage variant="error">Failed to load orders</StatusMessage>
      ) : data.orders.length === 0 ? (
        <StatusMessage variant="info">No orders found</StatusMessage>
      ) : (
        <OrdersTable orders={data.orders} />
      )}
    </Flex>
  )
}
