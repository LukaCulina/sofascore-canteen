import { IconOrders, IconPen } from "@/components/icons"
import { Button, H1, P } from "@/components/ui"
import { Flex } from "@/styled-system/jsx"
import { OrdersTable } from "./components/OrdersTable"

export const Orders = () => {
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
              <IconOrders width={28} height={28} fill="var(--colors-primary-default)" />
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
            Edit Payment Status
          </Flex>
        </Button>
      </Flex>
      <OrdersTable />
    </Flex>
  )
}
