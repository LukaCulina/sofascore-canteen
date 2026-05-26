import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { FormattedMessage } from "react-intl"
import { IconClear, IconSearch } from "@/components/icons"
import { Button, Input, StatusMessage } from "@/components/ui"
import { Box, Flex } from "@/styled-system/jsx"

export interface SearchBarItem {
  id: string
  label: string
}

interface SearchBarProps {
  items: SearchBarItem[]
  value: SearchBarItem | null
  placeholder?: string
  isDisabled?: boolean
  onChange: (item: SearchBarItem | null) => void
}

export const SearchBar = ({
  items,
  value,
  placeholder = "Search...",
  isDisabled,
  onChange,
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("")
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInputValue(value ? value.label : "")
  }, [value])

  const filteredItems = useMemo(() => {
    const query = inputValue.trim().toLowerCase()
    if (!query) return items

    return items.filter((item) => item.label.toLowerCase().includes(query))
  }, [items, inputValue])

  const handleClear = () => {
    setInputValue("")
    onChange(null)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <Box ref={dropdownRef} position="relative">
      <Input
        placeholder={placeholder}
        value={inputValue}
        disabled={isDisabled}
        onFocus={() => setOpen(true)}
        onChange={(value) => {
          setInputValue(value)
          setOpen(true)
        }}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
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

      <AnimatePresence>
        {open && (
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
          >
            <Box
              mt="sm"
              p="sm"
              bg="surface.s1"
              borderRadius="sm"
              borderWidth="thin"
              borderColor="neutrals.nLv4"
              maxH="220px"
              overflowY="auto"
              role="listbox"
            >
              {filteredItems.length ? (
                filteredItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    justifyContent="flex-start"
                    role="option"
                    onClick={() => {
                      setInputValue(item.label)
                      onChange(item)
                      setOpen(false)
                    }}
                  >
                    {item.label}
                  </Button>
                ))
              ) : (
                <StatusMessage variant="info" size="md">
                  <FormattedMessage id="search.noResults" />
                </StatusMessage>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}
