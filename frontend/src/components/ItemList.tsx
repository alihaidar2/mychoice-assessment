import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import {
  Box,
  useColorMode,
  Skeleton,
  Text,
  Heading,
  Badge,
  Input,
  Select,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { CreateItem } from "./CreateItem";

interface Item {
  id: number;
  name: string;
  group: string;
}

export function ItemList() {
  const { data, isLoading, error } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: () => api.get("/api/items/").then((res) => res.data),
  });
  const { colorMode } = useColorMode();

  // Filter state
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("All");

  // Filtering logic
  const filtered = (data || []).filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGroup = group === "All" || item.group === group;
    return matchesSearch && matchesGroup;
  });

  return (
    <Box>
      {/* Filters and New Item Button */}
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={4}
        mb={6}
        align="stretch"
        position="sticky"
        top={0}
        zIndex={10}
        bg={colorMode === "light" ? "gray.50" : "gray.700"}
        boxShadow="sm"
        py={4}
      >
        <CreateItem />
        <Input
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg={colorMode === "light" ? "white" : "gray.800"}
          flex={1}
        />
        <Select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          bg={colorMode === "light" ? "white" : "gray.800"}
          flex={1}
          maxW={{ sm: "200px" }}
        >
          <option value="All">All Groups</option>
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
        </Select>
      </Stack>

      {/* Loading state */}
      {isLoading ? (
        <Stack spacing={6} mt={8}>
          {[...Array(5)].map((_, i) => (
            <Box
              key={i}
              p={6}
              borderRadius="lg"
              boxShadow="lg"
              bg={colorMode === "light" ? "gray.100" : "gray.600"}
              w="100%"
              transition="transform 0.15s, box-shadow 0.15s"
              _hover={{
                transform: "translateY(-4px) scale(1.03)",
                boxShadow: "xl",
                textDecoration: "none",
              }}
              display="block"
            >
              <Skeleton height="24px" mb={2} />
              <Skeleton height="20px" mb={2} />
              <Skeleton height="20px" width="60px" />
            </Box>
          ))}
        </Stack>
      ) : error ? (
        <Box color="red.500">Error loading items.</Box>
      ) : (
        <Stack spacing={6} mt={8}>
          {filtered.map((item) => (
            <Box
              as={RouterLink}
              to={`/${item.id}`}
              key={item.id}
              p={6}
              borderRadius="lg"
              boxShadow="lg"
              bg={colorMode === "light" ? "gray.100" : "gray.600"}
              w="100%"
              transition="transform 0.15s, box-shadow 0.15s"
              _hover={{
                transform: "translateY(-4px) scale(1.03)",
                boxShadow: "xl",
                textDecoration: "none",
              }}
              display="block"
            >
              <Flex align="center" gap={4}>
                <Heading size="md" color="teal.500" mb={0} flexShrink={0}>
                  #{item.id}
                </Heading>
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  mb={0}
                  flex="1"
                  noOfLines={1}
                >
                  {item.name}
                </Text>
                <Badge
                  colorScheme={item.group === "Primary" ? "teal" : "purple"}
                  fontSize="0.9em"
                  flexShrink={0}
                >
                  {item.group}
                </Badge>
              </Flex>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
