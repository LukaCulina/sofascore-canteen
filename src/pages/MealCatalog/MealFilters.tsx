import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { IconArrowDown, IconClear, IconSearch } from "@/components/icons"
import { Input, Text } from "@/components/ui"
import { css } from "@/styled-system/css/css"
import { Box, Flex } from "@/styled-system/jsx"
import { Checkbox, Label } from "./styles"

interface FiltersState {
  vegetarian: boolean
  nonVegetarian: boolean
}

interface MealFiltersProps {
  onSearchChange: (value: string) => void
  onFiltersChange: (dietary: FiltersState) => void
}

export const MealFilters = ({ onSearchChange, onFiltersChange }: MealFiltersProps) => {
  const [inputValue, setInputValue] = useState("")
  const [filters, setFilters] = useState({ vegetarian: false, nonVegetarian: false })
  const [isOpen, setIsOpen] = useState(false)
  ////debounce((value: string)))

  const handleInput = (value: string) => {
    setInputValue(value)
    onSearchChange(value)
  }

  const handleFilters = (key: keyof FiltersState) => {
    const updated = { ...filters, [key]: !filters[key] }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const handleClear = () => {
    setInputValue("")
    onSearchChange("")
  }

  return (
    <Flex align="center" gap="xl">
      <Input
        variant="plain"
        flex="1"
        name="meal-search"
        placeholder="Search meals by name"
        value={inputValue}
        onChange={handleInput}
        startAdornment={
          <Flex align="center" justify="center" w="xl" h="xl">
            <IconSearch />
          </Flex>
        }
        endAdornment={
          inputValue ? (
            <button type="button" onClick={handleClear}>
              <Flex align="center" justify="center" w="xl" h="xl">
                <IconClear />
              </Flex>
            </button>
          ) : undefined
        }
      />
      <Box flexShrink="0" bg="surface.s1" p="md" borderRadius="sm" position="relative">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <Flex alignItems="center" gap="sm">
            <Text textStyle="body.large">Type</Text>
            <IconArrowDown />
          </Flex>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              style={{ position: "absolute", top: "100%", right: 0, zIndex: 10 }}
            >
              <Box
                position="absolute"
                right="0"
                mt="sm"
                bg="surface.s1"
                borderRadius="sm"
                p="md"
                minW="170px"
              >
                <Flex direction="column" gap="sm">
                  <Label>
                    <Checkbox
                      type="checkbox"
                      checked={filters.vegetarian}
                      onChange={() => handleFilters("vegetarian")}
                    />
                    Vegetarian
                  </Label>
                  <Label>
                    <Checkbox
                      type="checkbox"
                      checked={filters.nonVegetarian}
                      onChange={() => handleFilters("nonVegetarian")}
                    />
                    Non-Vegetarian
                  </Label>
                </Flex>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Flex>
  )
}
