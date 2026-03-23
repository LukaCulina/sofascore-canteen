import { useIntl } from "react-intl"
import { Text } from "@/components/ui"
import { Flex } from "@/styled-system/jsx"

export interface DateItemProps {
  date: Date
}

export function DateItem({ date }: Readonly<DateItemProps>) {
  const intl = useIntl()

  const dayNameShort = intl.formatDate(date, { weekday: "short" }).toUpperCase()
  const dayNameFull = intl.formatDate(date, { weekday: "long" })
  const formattedDate = intl.formatDate(date, { month: "long", day: "numeric", year: "numeric" })

  return (
    <Flex p="lg" roundedTop="lg" justifyItems="center" gap="lg" bg="surface.s1">
      <Flex p="sm" bg="surface.s2" rounded="sm">
        <Text textStyle="display.micro">{dayNameShort.toUpperCase()}</Text>
      </Flex>
      <Flex direction="column">
        <Text textStyle="display.small">{dayNameFull}</Text>
        <Text textStyle="assistive.default" color="neutrals.nLv3">
          {formattedDate}
        </Text>
      </Flex>
    </Flex>
  )
}
