import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import { postJson } from "@/api/http-client"
import { login } from "@/api/routes"
import { IconEmail, IconGoogle, IconSofascore } from "@/components/icons"
import { Anchor, Button, H1, Input, P, Text } from "@/components/ui"
import { useAuthStore } from "@/stores/auth"
import { Box, Center, HStack, VStack } from "@/styled-system/jsx"

import { Footer, Form, Header, LabelGroup } from "./styles"
import type { LoginResponse } from "./types"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()
  const intl = useIntl()

  const { setAuth } = useAuthStore()

  const handleLogin = () => {
    setIsSubmitting(true)

    postJson<LoginResponse>(login(), {
      email,
      password,
    })
      .then((data) => {
        setAuth(data.user, data.token, data.refreshToken)
        navigate({ to: "/" })
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <Center bg="background" minH="100dvh">
      <VStack
        bg="surface.s1"
        borderRadius={{ base: "0", sm: "lg" }}
        w={{ base: "100%", sm: "420px" }}
        minH={{ base: "100dvh", sm: "auto" }}
        overflow="hidden"
        gap="0"
      >
        <Header>
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
          <LabelGroup>
            <H1 textStyle="display.large">
              <FormattedMessage id="login.welcome" />
            </H1>
            <P textStyle="body.medium">
              <FormattedMessage id="login.subtitle" />
            </P>
          </LabelGroup>
        </Header>

        <Form>
          <VStack gap="lg" w="full" alignItems="stretch">
            <Input
              label={intl.formatMessage({ id: "login.email" })}
              name="email"
              type="email"
              required
              value={email}
              onChange={(value) => setEmail(value)}
            />
            <Input
              name="password"
              type="password"
              label={intl.formatMessage({ id: "login.password" })}
              required
              value={password}
              onChange={(value) => setPassword(value)}
            />
            <Button variant="primary" type="button" onClick={handleLogin} disabled={isSubmitting}>
              <IconEmail />
              <FormattedMessage id="login.signIn" />
            </Button>
          </VStack>
        </Form>

        <HStack role="separator" px="lg" py="sm" w="full" gap="lg" alignItems="center" my="lg">
          <Box flex="1" h="1px" bg="neutrals.nLv4" />
          <Text textStyle="body.medium" color="neutrals.nLv3" flexShrink={0}>
            <FormattedMessage id="login.orContinueWith" />
          </Text>
          <Box flex="1" h="1px" bg="neutrals.nLv4" />
        </HStack>

        <Box px="lg" pb="lg" w="full">
          <Button variant="outline">
            <IconGoogle />
            <FormattedMessage id="login.google" />
          </Button>
        </Box>

        <Footer>
          <FormattedMessage
            id="login.footer"
            values={{
              terms: (
                <Anchor href="https://www.sofascore.com/en-us/privacy-policy">
                  <FormattedMessage id="login.termsOfService" />
                </Anchor>
              ),
              privacy: (
                <Anchor href="https://www.sofascore.com/en-us/terms-and-conditions">
                  <FormattedMessage id="login.privacyPolicy" />
                </Anchor>
              ),
            }}
          />
        </Footer>
      </VStack>
    </Center>
  )
}
