import useSWR from "swr"
import { getOrders } from "@/api/routes"
import { IconOrders, IconPen } from "@/components/icons"
import { Button, H1, P, Spinner, Text } from "@/components/ui"
import { Flex } from "@/styled-system/jsx"
import type { Order } from "@/types/orders"
import { OrdersTable } from "./components/OrdersTable"

export const Orders = () => {
  const { data, isLoading, error } = useSWR<{ orders: Order[] }>(getOrders())

  if (isLoading) {
    return (
      <Flex h="full" direction="column" justify="center" align="center">
        <Spinner />
      </Flex>
    )
  }

  if (error || !data) {
    return (
      <Text textStyle="display.medium" color="status.error.default">
        Failed to load orders
      </Text>
    )
  }

  return (
    <Flex direction="column" gap="xl">
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        align="center"
        gap={{ base: "lg", lg: "4xl" }}
      >
        <Flex direction="column" gap="lg">
          <Flex direction="row" gap="sm" align="center">
            <Flex align="center" justify="center" w="32px" h="32px">
              <IconOrders width={28} height={28} />
            </Flex>
            <H1 fontSize="28px">All Orders</H1>
          </Flex>
          <P textStyle="body.large">View all employee meal orders across all periods.</P>
        </Flex>
        <Button variant="outline" w={{ base: "100%", lg: "fit-content" }}>
          <Flex direction="row" gap="sm" align="center">
            <Flex align="center" justify="center" w="32px" h="32px">
              <IconPen />
            </Flex>
            <Text textStyle="label.medium" color="primary.default">
              Edit Payment Status
            </Text>
          </Flex>
        </Button>
      </Flex>
      <OrdersTable orders={data.orders} />
    </Flex>
  )
}
