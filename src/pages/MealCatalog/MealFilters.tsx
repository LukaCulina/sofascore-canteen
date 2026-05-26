import { AnimatePresence, motion } from "framer-motion"
import { debounce } from "lodash"
import { useEffect, useMemo, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { IconArrowDown, IconArrowUp, IconClear, IconSearch } from "@/components/icons"
import { Checkbox, Input, Text } from "@/components/ui"
import { Box, Flex } from "@/styled-system/jsx"

interface FiltersState {
  vegetarian: boolean
  nonVegetarian: boolean
}

interface MealFiltersProps {
  filters: FiltersState
  onSearchChange: (value: string) => void
  onFiltersChange: (dietary: FiltersState) => void
}

export const MealFilters = ({ filters, onSearchChange, onFiltersChange }: MealFiltersProps) => {
  const [inputValue, setInputValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const intl = useIntl()

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (value: string) => {
          onSearchChange(value)
        },
        150,
        { maxWait: 1000 },
      ),
    [onSearchChange],
  )

  useEffect(() => {
    return () => debouncedSearch.cancel()
  }, [debouncedSearch])

  const handleInput = (value: string) => {
    setInputValue(value)
    debouncedSearch(value)
  }

  const handleFilters = (key: keyof FiltersState) => {
    const updated = { ...filters, [key]: !filters[key] }
    onFiltersChange(updated)
  }

  const handleClear = () => {
    setInputValue("")
    debouncedSearch.cancel()
    onSearchChange("")
  }

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-dropdown]")) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [isOpen])

  return (
    <Flex
      position="relative"
      direction={{ base: "column", md: "row" }}
      align="center"
      gap={{ base: "md", md: "xl" }}
    >
      <Input
        variant="plain"
        flex="1"
        w={{ base: "100%", md: "auto" }}
        name="meal-search"
        placeholder={intl.formatMessage({ id: "mealCatalog.searchByName" })}
        value={inputValue}
        onChange={handleInput}
        startAdornment={
          <Flex align="center" justify="center" w="xl" h="xl">
            <IconSearch />
          </Flex>
        }
        endAdornment={
          inputValue ? (
            <button type="button" aria-label="Clear search" onClick={handleClear}>
              <Flex align="center" justify="center" w="xl" h="xl" cursor="pointer">
                <IconClear />
              </Flex>
            </button>
          ) : undefined
        }
      />
      <Box
        position="relative"
        flexShrink="0"
        w={{ base: "100%", md: "auto" }}
        p="md"
        bg="surface.s1"
        borderRadius="sm"
        data-dropdown
      >
        <button
          type="button"
          aria-label="Toggle dietary filters"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Flex alignItems="center" gap="sm" cursor="pointer">
            <Text textStyle="body.large">
              <FormattedMessage id="mealCatalog.type" />
            </Text>
            {isOpen ? <IconArrowUp /> : <IconArrowDown />}
          </Flex>
        </button>
      </Box>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 10,
            }}
            role="menu"
            aria-label="Dietary filters"
            data-dropdown
          >
            <Box
              w={{ base: "100%", md: "160px" }}
              mt="sm"
              ml={{ base: 0, md: "auto" }}
              p="lg"
              bg="surface.s1"
              borderRadius="sm"
              borderWidth="thin"
              borderColor="neutrals.nLv4"
              boxShadow="md"
            >
              <Flex direction="column" gap="md">
                <Checkbox
                  checked={filters.vegetarian}
                  onChange={() => handleFilters("vegetarian")}
                  label={intl.formatMessage({ id: "mealCatalog.vegetarian" })}
                  labelStyle="body.medium"
                />
                <Checkbox
                  checked={filters.nonVegetarian}
                  onChange={() => handleFilters("nonVegetarian")}
                  label={intl.formatMessage({ id: "mealCatalog.nonVegetarian" })}
                  labelStyle="body.medium"
                />
              </Flex>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}
