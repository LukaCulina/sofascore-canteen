import { IconMenu } from "@/components/icons"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { useAuthStore } from "@/stores/auth"
import { Flex } from "@/styled-system/jsx"

import * as S from "./AppHeader.styles"

function getInitials(email: string) {
  const name = email.split("@")[0]
  const parts = name.split(/[._-]/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

interface AppHeaderProps {
  onOpenSidebar: () => void
}

export const AppHeader = ({ onOpenSidebar }: AppHeaderProps) => {
  const user = useAuthStore((s) => s.user)

  return (
    <S.Header>
      <S.HamburgerButton type="button" onClick={onOpenSidebar} aria-label="Open navigation">
        <IconMenu />
      </S.HamburgerButton>

      <Flex align="center" gap="lg">
        <ThemeToggle />
        <S.InitialsContainer>{user ? getInitials(user.email) : "??"}</S.InitialsContainer>
      </Flex>
    </S.Header>
  )
}
