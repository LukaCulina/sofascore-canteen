import { Link, useNavigate } from "@tanstack/react-router"
import { FormattedMessage, useIntl } from "react-intl"
import { IconMealCatalog, IconPlans, IconSofascore } from "@/components/icons"
import { Text } from "@/components/ui/Text"
import { Role, useAuthStore } from "@/stores/auth"
import { css, cx } from "@/styled-system/css"
import { Box, Flex } from "@/styled-system/jsx"

import { IconCanteen, IconLogout, IconOrders, IconPlanner } from "../icons"
import type { IconProps } from "../icons/interface"
import * as S from "./AppSidebar.styles"

interface NavItem {
  to: string
  icon: React.FunctionComponent<IconProps>
  labelId: string
  roles?: Role[]
}

const navItems: NavItem[] = [
  { to: "/", icon: IconCanteen, labelId: "nav.canteen" },
  { to: "/planner", icon: IconPlanner, labelId: "nav.planner", roles: [Role.ADMIN, Role.CATERING] },
  {
    to: "/catering/catalog",
    icon: IconMealCatalog,
    labelId: "nav.mealCatalog",
    roles: [Role.CATERING, Role.ADMIN],
  },
  { to: "/my-plans", icon: IconPlans, labelId: "nav.myPlans", roles: [Role.CATERING] },
  {
    to: "/orders",
    icon: IconOrders,
    labelId: "nav.myOrders",
    roles: [Role.EMPLOYEE, Role.CATERING],
  },
] as const

interface AppSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const AppSidebar = ({ isOpen, onClose }: AppSidebarProps) => {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const intl = useIntl()

  const handleLogout = () => {
    logout()
    navigate({ to: "/login" })
  }

  const visibleNavItems = user
    ? navItems.filter((item) => !item.roles || item.roles.includes(user.role))
    : []

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
          borderBottomWidth="thin"
          borderBottomStyle="solid"
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
            <FormattedMessage id="nav.canteen" />
          </Text>
        </Flex>

        {/* Nav Items */}
        <Box flex="1" p="lg" overflow="auto">
          <S.SidebarNavigationList>
            {visibleNavItems.map(({ to, icon: Icon, labelId }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={S.navItemStyle}
                  activeProps={{
                    "data-active": "true",
                  }}
                  activeOptions={{ exact: to === "/" }}
                >
                  {({ isActive } : { isActive: boolean }) => (
                    <Flex align="center" justify="center" gap="sm">
                      <Flex align="center" justify="center" w="xl" h="xl">
                        <Icon fill={isActive ? "primary.default" : "neutrals.nLv1"} />
                      </Flex>
                      <Text
                        textStyle="display.small"
                        color={isActive ? "primary.default" : "neutrals.nLv1"}
                      >
                        {intl.formatMessage({ id: labelId })}
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
                <Flex align="center" justify="center" w="xl" h="xl">
                  <IconLogout />
                </Flex>
                <FormattedMessage id="nav.logout" />
              </button>
            </li>
          </S.SidebarNavigationList>
        </Box>

        {/* Nav Footer */}
        <Box px="lg" py="xl" boxShadow="inset 0 1px 0 0 token(colors.neutrals.nLv4)">
          <Box
            bg="tertiary.highlight"
            borderWidth="thin"
            borderStyle="solid"
            borderColor="tertiary.highlight"
            borderRadius="sm"
            px="lg"
            py="sm"
          >
            <Text textStyle="assistive.default" color="neutrals.nLv3" display="block">
              <FormattedMessage id="nav.loggedAs" />
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
