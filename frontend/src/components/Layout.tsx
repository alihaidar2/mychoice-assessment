// src/components/Layout.tsx
import React from "react";
import type { ReactNode } from "react";
import { Box, Flex, Heading, Text, Container } from "@chakra-ui/react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Flex direction="column" minH="100vh">
      {/* Header */}
      <Box as="header" bg="teal.600" color="white" py={4}>
        <Container maxW="container.md" textAlign="center">
          <Heading size="md">myChoice Assessment : Ali Haidar</Heading>
        </Container>
      </Box>

      {/* Main content */}
      <Box as="main" flex="1" py={8}>
        <Container maxW="container.md">{children}</Container>
      </Box>

      {/* Footer */}
      <Box as="footer" bg="gray.100" py={4}>
        <Container maxW="container.md" textAlign="center">
          <Text fontSize="sm" color="gray.600">
            © {new Date().getFullYear()} Ali Haidar
          </Text>
        </Container>
      </Box>
    </Flex>
  );
}
