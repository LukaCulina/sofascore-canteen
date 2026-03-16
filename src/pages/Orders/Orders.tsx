import { IconOrders, IconPen } from "@/components/icons"
import { Button, H1, P } from "@/components/ui"
import { Flex } from "@/styled-system/jsx"
import { OrdersTable } from "./OrdersTable"

export const Orders = () => {
  return (
    <Flex direction="column" gap="xl">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap={{ base: "lg", md: "4xl" }}
      >
        <Flex direction="column" gap="lg">
          <Flex direction="row" gap="sm" align="center">
            <Flex align="center" justify="center" w="32px" h="32px">
              <IconOrders width={32} height={32} fill="var(--colors-primary-default)" />
            </Flex>
            <H1 fontSize={{ base: "24px", md: "28px" }}>All Orders</H1>
          </Flex>
          <P textStyle={{ base: "body.medium", md: "body.large" }}>
            View all employee meal orders across all periods.
          </P>
        </Flex>
        <Button variant="outline" w={{ base: "100%", md: "fit-content" }}>
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
