import { memo } from "react"
import { Text } from "@/components/ui"
import { Flex } from "@/styled-system/jsx"

export interface DateItemProps {
  date: Date
}

const weekdayShortFmt = new Intl.DateTimeFormat("en-US", { weekday: "short" })
const weekdayLongFmt = new Intl.DateTimeFormat("en-US", { weekday: "long" })
const fullDateFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
})

export const DateItem = memo(function DateItem({ date }: Readonly<DateItemProps>) {
  const dayNameShort = weekdayShortFmt.format(date).toUpperCase()
  const dayNameFull = weekdayLongFmt.format(date)
  const formattedDate = fullDateFmt.format(date)

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
})
