import React from "react";
import { Container, Heading } from "@chakra-ui/react";
import { ItemList } from "./components/ItemList";
import { CreateItem } from "./components/CreateItem";

function App() {
  return (
    <Container maxW="container.md" py={8}>
      <Heading mb={4}>Items</Heading>
      <CreateItem />
      <ItemList />
    </Container>
  );
}

export default App;
