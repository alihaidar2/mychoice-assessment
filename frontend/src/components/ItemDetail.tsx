// src/components/ItemDetail.tsx
import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  Badge,
  Flex,
  useColorMode,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { EditIcon } from "@chakra-ui/icons";

interface Item {
  id: number;
  name: string;
  group: string;
  created_at: string;
  updated_at: string;
}

export function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const { colorMode } = useColorMode();
  const { data, isLoading, error } = useQuery<Item, Error>({
    queryKey: ["item", id],
    queryFn: () => api.get<Item>(`/api/items/${id}/`).then((res) => res.data),
    enabled: Boolean(id),
  });

  if (isLoading)
    return (
      <Center h="60vh">
        <Spinner size="xl" />
      </Center>
    );
  if (error) return <Box color="red.500">Error loading item.</Box>;
  if (!data) return <Box>No item found.</Box>;

  return (
    <Flex justify="center" align="center" minH="70vh" px={2}>
      <Box
        as={motion.div}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 } as any}
        p={{ base: 6, md: 10 }}
        borderRadius="2xl"
        boxShadow="2xl"
        bg={colorMode === "light" ? "gray.100" : "gray.600"}
        maxW="600px"
        w="100%"
      >
        <Flex align="center" justify="space-between" mb={6} gap={4}>
          <Flex align="center" gap={4} minW={0}>
            <Heading size="lg" color="teal.500" mb={0} noOfLines={1}>
              Item #{data.id}
            </Heading>
            <Badge
              colorScheme={data.group === "Primary" ? "teal" : "purple"}
              fontSize="1em"
              px={3}
              py={1}
              borderRadius="md"
            >
              {data.group}
            </Badge>
          </Flex>
          <IconButton
            as={RouterLink}
            to={`/${data.id}/edit`}
            colorScheme="teal"
            aria-label="Edit"
            icon={<EditIcon />}
            size="lg"
            variant="ghost"
            _hover={{ bg: colorMode === "light" ? "teal.50" : "teal.900" }}
          />
        </Flex>
        <Divider mb={6} />
        <Text fontWeight="bold" fontSize="2xl" mb={2} noOfLines={2}>
          {data.name}
        </Text>
      </Box>
    </Flex>
  );
}
