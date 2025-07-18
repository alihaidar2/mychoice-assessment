// src/components/ItemDetail.tsx
import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Box, Heading, Text, Button, Spinner, Center } from "@chakra-ui/react";

// 1) Define the Item shape right here
interface Item {
  id: number;
  name: string;
  group: string;
  created_at: string;
  updated_at: string;
}

export function ItemDetail() {
  const { id } = useParams<{ id: string }>();

  // 2) Use the single-object overload and generics so TS knows your data type
  const {
    data, // typed as Item | undefined
    isLoading,
    error,
  } = useQuery<Item, Error>({
    queryKey: ["item", id],
    queryFn: () => api.get<Item>(`/api/items/${id}/`).then((res) => res.data),
    enabled: Boolean(id),
  });

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );
  if (error) return <Box color="red.500">Error loading item.</Box>;
  if (!data) return <Box>No item found.</Box>;

  return (
    <Box>
      <Heading size="md" mb={2}>
        Item #{data.id}
      </Heading>
      <Text>
        <strong>Name:</strong> {data.name}
      </Text>
      <Text>
        <strong>Group:</strong> {data.group}
      </Text>
      <Button as={RouterLink} to={`/${data.id}/edit`} mt={4} colorScheme="teal">
        Edit
      </Button>
    </Box>
  );
}
