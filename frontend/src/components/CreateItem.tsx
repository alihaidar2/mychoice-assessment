// src/components/CreateItem.tsx
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
  FormErrorMessage,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";
import type { AxiosError } from "axios";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  group: z.enum(["Primary", "Secondary"] as const),
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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        colorScheme="teal"
        icon={<AddIcon />}
        aria-label="Add New Item"
        _hover={{ transform: "scale(1.05)" }}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create New Item</ModalHeader>
          <ModalBody>
            <FormControl isInvalid={!!errors.name} mb={3}>
              <FormLabel>Name</FormLabel>
              <Input {...register("name")} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.group}>
              <FormLabel>Group</FormLabel>
              <Select placeholder="Select group" {...register("group")}>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
              </Select>
              <FormErrorMessage>{errors.group?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              type="submit"
              isLoading={isSubmitting}
              _hover={{ transform: "scale(1.05)" }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
