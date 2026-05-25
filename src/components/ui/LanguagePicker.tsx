import { useEffect, useRef, useState } from "react"
import { useIntl } from "react-intl"
import { IconArrowDown, IconArrowUp } from "@/components/icons"
import { type Locale, useLocaleStore } from "@/stores/locale"
import { Flex, styled } from "@/styled-system/jsx"

const PickerButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "xs",
    bg: "transparent",
    border: "none",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "neutrals.nLv4",
    cursor: "pointer",
    p: "sm",
    borderRadius: "sm",
    color: "neutrals.nLv1",
    _hover: {
      bg: "primary.highlight",
    },
    _focusVisible: {
      outlineWidth: "thick",
      outlineStyle: "solid",
      outlineColor: "primary.default",
      outlineOffset: "2xs",
    },
  },
})

const DropdownMenu = styled("div", {
  base: {
    position: "absolute",
    top: "100%",
    right: 0,
    mt: "xs",
    p: "sm",
    bg: "surface.s1",
    borderRadius: "sm",
    borderWidth: "thin",
    borderStyle: "solid",
    borderColor: "neutrals.nLv4",
    boxShadow: "md",
    zIndex: 50,
    overflow: "hidden",
    minW: "fit-content",
    whiteSpace: "nowrap",
  },
})

const OptionButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "sm",
    w: "full",
    px: "lg",
    py: "sm",
    bg: "transparent",
    border: "none",
    cursor: "pointer",
    textStyle: "body.medium",
    color: "neutrals.nLv1",
    _hover: {
      bg: "primary.highlight",
    },
  },
})

const localeConfig: Record<Locale, { flag: string; label: string }> = {
  en: { flag: "/uk-circle.png", label: "EN" },
  hr: { flag: "/hr-circle.png", label: "HR" },
}

export const LanguagePicker = () => {
  const locale = useLocaleStore((s) => s.locale)
  const setLocale = useLocaleStore((s) => s.setLocale)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const intl = useIntl()

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [isOpen])

  const current = localeConfig[locale]

  return (
    <Flex ref={ref} position="relative" overflow="visible">
      <PickerButton
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={intl.formatMessage({ id: "language.label" })}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <img src={current.flag} alt={current.label} width={24} height={24} />
        {isOpen ? (
          <IconArrowUp fill="neutrals.nLv1" width={24} height={24} />
        ) : (
          <IconArrowDown fill="neutrals.nLv1" width={24} height={24} />
        )}
      </PickerButton>

      {isOpen && (
        <DropdownMenu role="listbox" aria-label={intl.formatMessage({ id: "language.label" })}>
          {(Object.keys(localeConfig) as Locale[]).map((key) => {
            const cfg = localeConfig[key]
            return (
              <OptionButton
                key={key}
                type="button"
                role="option"
                aria-selected={locale === key}
                aria-label={cfg.label}
                onClick={() => {
                  setLocale(key)
                  setIsOpen(false)
                }}
              >
                <img src={cfg.flag} alt={cfg.label} width={24} height={24} />
              </OptionButton>
            )
          })}
        </DropdownMenu>
      )}
    </Flex>
  )
}
