// frontend/src/theme.ts
import { extendTheme, theme as base } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const theme = extendTheme({
  colors: {
    brand: base.colors.teal,
    secondary: base.colors.purple,
    gray: {
      800: "#23272f",
      900: "#181a20",
      700: "#22252b",
    },
  },
  fonts: {
    heading: `'Inter', system-ui, sans-serif`,
    body: `'Inter', system-ui, sans-serif`,
  },
  fontWeights: {
    body: 400,
    heading: 700,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
        color: props.colorMode === "dark" ? "#F7FAFC" : "gray.800",
      },
    }),
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: 700,
        color: { dark: "white", light: "gray.800" },
      },
      sizes: {
        md: {
          fontSize: "2xl",
        },
        lg: {
          fontSize: "3xl",
        },
      },
    },
    Text: {
      baseStyle: {
        fontWeight: 400,
        color: { dark: "#F7FAFC", light: "gray.800" },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: "md",
        px: 2,
        py: 0.5,
      },
      variants: {
        solid: (props: { colorScheme?: string }) => ({
          bg: props.colorScheme === "secondary" ? "purple.500" : undefined,
        }),
      },
    },
    Input: {
      variants: {
        outline: (props: StyleFunctionProps) => ({
          field: {
            bg: props.colorMode === "dark" ? "gray.700" : "white",
            color: props.colorMode === "dark" ? "#F7FAFC" : "gray.800",
            borderColor: props.colorMode === "dark" ? "gray.600" : "gray.200",
            _placeholder: {
              color: props.colorMode === "dark" ? "gray.400" : "gray.500",
            },
          },
        }),
      },
    },
    Select: {
      variants: {
        outline: (props: StyleFunctionProps) => ({
          field: {
            bg: props.colorMode === "dark" ? "gray.700" : "white",
            color: props.colorMode === "dark" ? "#F7FAFC" : "gray.800",
            borderColor: props.colorMode === "dark" ? "gray.600" : "gray.200",
            _placeholder: {
              color: props.colorMode === "dark" ? "gray.400" : "gray.500",
            },
          },
        }),
      },
    },
    Box: {
      baseStyle: (props: StyleFunctionProps) => ({
        bg: props.colorMode === "dark" ? "gray.800" : undefined,
        boxShadow:
          props.colorMode === "dark"
            ? "0 2px 8px 0 rgba(0,0,0,0.32), 0 1.5px 4px 0 rgba(255,255,255,0.04)"
            : undefined,
      }),
    },
    Container: {
      baseStyle: (props: StyleFunctionProps) => ({
        color: props.colorMode === "dark" ? "#F7FAFC" : "gray.800",
      }),
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

export default theme;
