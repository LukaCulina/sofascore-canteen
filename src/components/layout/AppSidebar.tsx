import { Link, useNavigate } from "@tanstack/react-router"
import { IconSofascore } from "@/components/icons"
import { Text } from "@/components/ui/Text"
import { canAccessPlanner, useAuthStore } from "@/stores/auth"
import { css, cx } from "@/styled-system/css"
import { Box, Flex } from "@/styled-system/jsx"

import { IconCanteen, IconLogout, IconPlanner } from "../icons"
import * as S from "./AppSidebar.styles"

interface AppSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const AppSidebar = ({ isOpen, onClose }: AppSidebarProps) => {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const navItems = [
    { to: "/", icon: IconCanteen, label: "Canteen" },
    ...(user?.role && canAccessPlanner(user.role)
      ? [{ to: "/planner", icon: IconPlanner, label: "Planner" }]
      : []),
  ] as const

  const handleLogout = () => {
    logout()
    navigate({ to: "/login" })
  }

  return (
    <>
      {isOpen && <S.Backdrop onClick={onClose} />}
      <S.SidebarNavigation aria-label="Main navigation" data-open={isOpen}>
        {/* Nav Header */}
        <Flex
          align="center"
          gap="lg"
          px="lg"
          py="xl"
          borderBottom="1px solid"
          borderColor="neutrals.nLv4"
        >
          <Box
            bg="primary.default"
            borderRadius="sm"
            p="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <IconSofascore />
          </Box>
          <Text textStyle="display.large" color="neutrals.nLv1">
            Canteen
          </Text>
        </Flex>

        {/* Nav Items */}
        <Box flex="1" p="lg" overflow="auto">
          <S.SidebarNavigationList>
            {navItems.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={S.navItemStyle}
                  activeProps={{
                    className: cx(S.navItemStyle, S.navItemActiveStyle),
                  }}
                  activeOptions={{ exact: to === "/" }}
                >
                  {({ isActive }) => (
                    <Flex align="center" justify="center" gap="sm">
                      <Icon fill={isActive ? "primary.default" : "neutrals.nLv1"} />
                      <Text
                        textStyle="display.small"
                        color={isActive ? "primary.default" : "neutrals.nLv1"}
                      >
                        {label}
                      </Text>
                    </Flex>
                  )}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className={cx(
                  S.navItemStyle,
                  css({ bg: "transparent", border: "none", width: "100%" }),
                )}
              >
                <Flex align="center" justify="center" w="24px" h="24px">
                  <IconLogout />
                </Flex>
                Log out
              </button>
            </li>
          </S.SidebarNavigationList>
        </Box>

        {/* Nav Footer */}
        <Box px="lg" py="xl" boxShadow="inset 0 1px 0 0 token(colors.neutrals.nLv4)">
          <Box
            bg="tertiary.highlight"
            border="1px solid"
            borderColor="tertiary.highlight"
            borderRadius="sm"
            px="lg"
            py="sm"
          >
            <Text textStyle="assistive.default" color="neutrals.nLv3" display="block">
              Logged as
            </Text>
            <Text textStyle="display.small" color="neutrals.nLv1" display="block">
              {user!.email}
            </Text>
          </Box>
        </Box>
      </S.SidebarNavigation>
    </>
  )
}
