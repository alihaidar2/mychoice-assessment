import React from "react";
import { Container, Heading } from "@chakra-ui/react";
import { ItemList } from "./components/ItemList";

function App() {
  return (
    <Container maxW="container.md" py={8}>
      <Heading mb={4}>Items</Heading>
      <ItemList />
    </Container>
  );
}

export default App;
