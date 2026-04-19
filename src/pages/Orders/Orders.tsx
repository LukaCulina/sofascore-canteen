import { useState } from "react"
import useSWR from "swr"
import { postJson } from "@/api/http-client"
import { getOrders, updatePaymentStatus } from "@/api/routes"
import { IconOrders, IconPen } from "@/components/icons"
import { Button, H1, LoadingSpinner, P, StatusMessage, Text } from "@/components/ui"
import { Role, useAuthStore } from "@/stores/auth"
import { Flex } from "@/styled-system/jsx"
import type { Order } from "@/types/orders"
import { OrdersTable } from "./components/OrdersTable"

export const Orders = () => {
  const { data, isLoading, error, mutate } = useSWR<{ orders: Order[] }>(getOrders())
  const user = useAuthStore((s) => s.user)

  const isAdmin = user?.role === Role.ADMIN

  const [isEditing, setIsEditing] = useState(false)
  const [changes, setChanges] = useState<Record<number, boolean>>({})
  const [saveError, setSaveError] = useState(false)

  const handleSave = async () => {
    setSaveError(false)

    try {
      const updates = Object.entries(changes).map(([id, unpaid]) => ({
        id: Number(id),
        unpaid,
      }))

      await postJson(updatePaymentStatus(), { updates })

      setIsEditing(false)
      setChanges({})
      mutate()
    } catch {
      setSaveError(true)
    }
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
          <Flex align="center" gap="sm">
            <Flex align="center" justify="center" w="2xl" h="2xl">
              <IconOrders width={28} height={28} />
            </Flex>
            <H1 fontSize="28px">All Orders</H1>
          </Flex>
          <P textStyle="body.large">View all employee meal orders across all periods.</P>
        </Flex>
        {isAdmin && (
          <Flex
            w={{ base: "100%", lg: "fit-content" }}
            gap="md"
            direction={{ base: "column", lg: "row" }}
          >
            {saveError && (
              <Flex align="center" justify="center">
                <P color="status.error.default">Failed to update payment status</P>
              </Flex>
            )}

            {isEditing && (
              <Button
                variant="primary"
                w={{ base: "100%", lg: "fit-content" }}
                onClick={handleSave}
                disabled={Object.keys(changes).length === 0}
              >
                Save Changes
              </Button>
            )}
            <Button
              variant="outline"
              w={{ base: "100%", lg: "fit-content" }}
              disabled={!data || data.orders.length === 0}
              onClick={() => {
                setIsEditing((prev) => !prev)
                setChanges({})
                setSaveError(false)
              }}
            >
              {isEditing ? (
                <Text textStyle="label.medium" color="primary.default">
                  Cancel
                </Text>
              ) : (
                <Flex direction="row" gap="sm" align="center">
                  <Flex align="center" justify="center" w="2xl" h="2xl">
                    <IconPen />
                  </Flex>
                  <Text textStyle="label.medium" color="primary.default">
                    Edit Payment Status
                  </Text>
                </Flex>
              )}
            </Button>
          </Flex>
        )}
      </Flex>

      {isLoading ? (
        <LoadingSpinner />
      ) : error || !data ? (
        <StatusMessage variant="error">Failed to load orders</StatusMessage>
      ) : data.orders.length === 0 ? (
        <StatusMessage variant="info">No orders found</StatusMessage>
      ) : (
        <OrdersTable
          orders={data.orders}
          isEditing={isEditing}
          changes={changes}
          setChanges={setChanges}
        />
      )}
    </Flex>
  )
}
