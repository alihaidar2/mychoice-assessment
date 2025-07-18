// src/components/EditItem.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import type { AxiosError } from "axios";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  group: z.enum(["Primary", "Secondary"] as const),
});
type FormData = z.infer<typeof schema>;

interface Item {
  id: number;
  name: string;
  group: "Primary" | "Secondary";
  created_at: string;
  updated_at: string;
}

export function EditItem() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<Item, Error>({
    queryKey: ["item", id],
    queryFn: () => api.get<Item>(`/api/items/${id}/`).then((res) => res.data),
    enabled: Boolean(id),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (data) {
      reset({ name: data.name, group: data.group });
    }
  }, [data, reset]);

  const mutation = useMutation<Item, Error, FormData>({
    mutationFn: (updated) =>
      api.patch<Item>(`/api/items/${id}/`, updated).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({ status: "success", title: "Item updated" });
      navigate("/");
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{
        non_field_errors?: string[];
        name?: string[];
      }>;
      const msg =
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.name?.[0] ||
        error.message ||
        "Unknown error";
      toast({
        status: "error",
        title: "Could not update item",
        description: msg,
      });
    },
  });

  const onSubmit: SubmitHandler<FormData> = (values) => {
    mutation.mutate(values);
  };

  if (isLoading)
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.name} mb={3}>
        <FormLabel>Name</FormLabel>
        <Input {...register("name")} />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.group} mb={3}>
        <FormLabel>Group</FormLabel>
        <Select {...register("group")}>
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
        </Select>
        <FormErrorMessage>{errors.group?.message}</FormErrorMessage>
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
