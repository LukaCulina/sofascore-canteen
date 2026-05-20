import { IconArrowDown, IconMoon } from "@/components/icons"
import { useThemeStore } from "@/stores/theme"
import { styled } from "@/styled-system/jsx"

const ToggleButton = styled("button", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bg: "transparent",
    border: "none",
    cursor: "pointer",
    p: "xs",
    borderRadius: "sm",
    color: "neutrals.nLv1",
    _hover: {
      bg: "primary.highlight",
    },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "primary.default",
      outlineOffset: "2px",
    },
  },
})

export const ThemeToggle = () => {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)

  const isDark = theme === "dark"

  return (
    <ToggleButton
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <IconArrowDown fill="neutrals.nLv1" aria-hidden="true" />
      ) : (
        <IconMoon fill="neutrals.nLv1" aria-hidden="true" />
      )}
    </ToggleButton>
  )
}
