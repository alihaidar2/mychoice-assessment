import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
  Box,
} from "@chakra-ui/react";

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
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  if (error) {
    return <Box color="red.500">Error loading items.</Box>;
  }

  return (
    <Table variant="simple" mt={4}>
      <Thead bg="gray.100">
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Group</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((item) => (
          <Tr key={item.id}>
            <Td>{item.id}</Td>
            <Td>{item.name}</Td>
            <Td>{item.group}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
