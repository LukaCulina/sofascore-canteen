import { FormattedMessage } from "react-intl"
import useSWR from "swr"
import { getJson } from "@/api/http-client"
import { adminOrders, myOrders } from "@/api/routes"
import { IconOrders, IconPen } from "@/components/icons"
import { Button, H1, P, Spinner, StatusMessage, Text } from "@/components/ui"
import { Role, useAuthStore } from "@/stores/auth"
import { Flex } from "@/styled-system/jsx"
import type { Order } from "@/types/orders"
import { OrdersTable } from "./components/OrdersTable"
import { usePaymentEdit } from "./hooks/usePaymentEdit"

export const Orders = () => {
  const user = useAuthStore((s) => s.user)

  const isAdmin = user?.role === Role.ADMIN

  const url = isAdmin ? adminOrders() : myOrders()
  const { token } = useAuthStore()

  const { data, isLoading, error, mutate } = useSWR<{ orders: Order[] }>(
    token ? url : null,
    (url: string) => getJson<{ orders: Order[] }>(url),
  )

  const { isEditing, changes, setChanges, isSaving, handleEdit, handleSave, handleCancel } =
    usePaymentEdit(data?.orders, mutate)

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
            <H1 fontSize="28px">
              <FormattedMessage id="orders.title" />
            </H1>
          </Flex>
          <P textStyle="body.large">
            <FormattedMessage id="orders.subtitle" />
          </P>
        </Flex>
        {isAdmin && (
          <Flex
            w={{ base: "100%", lg: "fit-content" }}
            gap="md"
            direction={{ base: "column", lg: "row" }}
          >
            {isEditing && (
              <Button
                variant="primary"
                w={{ base: "100%", lg: "fit-content" }}
                onClick={handleSave}
                disabled={Object.keys(changes).length === 0 || isSaving}
              >
                {isSaving ? (
                  <Flex align="center" gap="sm">
                    <Spinner size="md" /> <FormattedMessage id="orders.saving" />
                  </Flex>
                ) : (
                  <FormattedMessage id="orders.saveChanges" />
                )}
              </Button>
            )}
            <Button
              variant="outline"
              w={{ base: "100%", lg: "fit-content" }}
              disabled={!data || data.orders.length === 0 || isSaving}
              onClick={isEditing ? handleCancel : handleEdit}
            >
              {isEditing ? (
                <Text textStyle="label.medium" color="primary.default">
                  <FormattedMessage id="orders.cancel" />
                </Text>
              ) : (
                <Flex direction="row" gap="sm" align="center">
                  <Flex align="center" justify="center" w="2xl" h="2xl">
                    <IconPen />
                  </Flex>
                  <Text textStyle="label.medium" color="primary.default">
                    <FormattedMessage id="orders.editPaymentStatus" />
                  </Text>
                </Flex>
              )}
            </Button>
          </Flex>
        )}
      </Flex>

      {isLoading ? (
        <Flex justify="center" align="center" py="6xl">
          <Spinner role="status" />
        </Flex>
      ) : error || !data ? (
        <Flex justify="center" align="center" py="6xl">
          <StatusMessage variant="error">
            <FormattedMessage id="orders.failedToLoad" />
          </StatusMessage>
        </Flex>
      ) : data.orders.length === 0 ? (
        <Flex justify="center" align="center" py="6xl">
          <StatusMessage variant="info">
            <FormattedMessage id="orders.noOrders" />
          </StatusMessage>
        </Flex>
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
