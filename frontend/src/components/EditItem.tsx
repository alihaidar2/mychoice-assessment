import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import {
  Box,
  Spinner,
  Center,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";

interface Item {
  id: number;
  name: string;
  group: "Primary" | "Secondary";
  created_at: string;
  updated_at: string;
}

const schema = z.object({
  name: z.string().min(1),
  group: z.enum(["Primary", "Secondary"] as const),
});
type FormData = z.infer<typeof schema>;

export function EditItem() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data, isLoading } = useQuery<Item, Error>({
    queryKey: ["item", id],
    queryFn: () => api.get<Item>(`/api/items/${id}/`).then((res) => res.data),
    enabled: Boolean(id),
  });

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Prefill form when data loads
  useEffect(() => {
    if (data) reset({ name: data.name, group: data.group });
  }, [data, reset]);

  const mutation = useMutation<Item, Error, FormData>({
    mutationFn: (updated) =>
      api.patch<Item>(`/api/items/${id}/`, updated).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({ status: "success", title: "Item updated" });
      navigate("/");
    },
  });

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  const onSubmit: SubmitHandler<FormData> = (values) => {
    mutation.mutate(values);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={3}>
        <FormLabel>Name</FormLabel>
        <Input {...register("name")} />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Group</FormLabel>
        <Select {...register("group")}>
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
        </Select>
      </FormControl>
      <Button
        type="submit"
        colorScheme="teal"
        isLoading={mutation.status === "pending"}
      >
        Save
      </Button>
    </Box>
  );
}
