import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import type { AxiosError } from "axios";

// 1. Define the Zod schema to mirror backend rules:
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  group: z
    .enum(["Primary", "Secondary"] as const)
    .refine((g) => ["Primary", "Secondary"].includes(g), {
      message: "Group must be Primary or Secondary",
    }),
});

type FormData = z.infer<typeof schema>;

export function CreateItem() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // 2. Define the mutation to POST and invalidate the list:
  const mutation = useMutation({
    mutationFn: (newItem: FormData) =>
      api.post("/api/items/", newItem).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast({ status: "success", title: "Item created!" });
      onClose();
      reset();
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
        title: "Could not create item",
        description: msg,
      });
    },
  });

  // 3. Hook up form submit:
  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" mb={4}>
        New Item
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create New Item</ModalHeader>
          <ModalBody>
            <FormControl isInvalid={!!errors.name} mb={3}>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Item name" {...register("name")} />
            </FormControl>
            <FormControl isInvalid={!!errors.group}>
              <FormLabel>Group</FormLabel>
              <Select placeholder="Select group" {...register("group")}>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="teal" type="submit" isLoading={isSubmitting}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
