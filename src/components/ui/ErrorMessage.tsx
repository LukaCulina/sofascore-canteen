import { Text } from "@/components/ui/Text"
import { Flex } from "@/styled-system/jsx"

export const ErrorMessage = ({ children }: { children: string }) => {
  return (
    <Flex justify="center" align="center" py="6xl">
      <Text textStyle="display.medium" color="status.error.default">
        {children}
      </Text>
    </Flex>
  )
}
