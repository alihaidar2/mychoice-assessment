// src/components/Layout.tsx
import React, { type ReactNode } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const MotionDiv = motion(chakra.div);
  return (
    <Flex direction="column" minH="100vh">
      {/* Header */}
      <Box as="header" bg="brand.500" color="white" py={4} px={6}>
        <Container maxW="container.md" p={0}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg" color="white">
              myChoice Assessment : Ali Haidar
            </Heading>
            <IconButton
              aria-label="Toggle color mode"
              variant="ghost"
              color="white"
              onClick={toggleColorMode}
              icon={
                <AnimatePresence mode="wait" initial={false}>
                  {colorMode === "light" ? (
                    <MotionDiv
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MoonIcon />
                    </MotionDiv>
                  ) : (
                    <MotionDiv
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SunIcon />
                    </MotionDiv>
                  )}
                </AnimatePresence>
              }
            />
          </Flex>
        </Container>
      </Box>
      {/* Main content */}
      <Box
        as="main"
        flex="1"
        py={8}
        px={6}
        bg={colorMode === "light" ? "white" : "gray.800"}
      >
        <Container maxW="container.md">{children}</Container>
      </Box>
      {/* Footer */}
      <Box as="footer" bg="gray.100" py={4} px={6}>
        <Container maxW="container.md" textAlign="center">
          <Text fontSize="sm" color="gray.600">
            © {new Date().getFullYear()} Ali Haidar
          </Text>
        </Container>
      </Box>
    </Flex>
  );
}
