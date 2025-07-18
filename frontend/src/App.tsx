import React from "react";
import { Container, Heading, Box, Link } from "@chakra-ui/react";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { ItemList } from "./components/ItemList";
import { CreateItem } from "./components/CreateItem";
import { ItemDetail } from "./components/ItemDetail";
import { EditItem } from "./components/EditItem";

function App() {
  return (
    <Container maxW="container.md" py={8}>
      <Box mb={4}>
        <Link as={RouterLink} to="/">
          ← Back to list
        </Link>
      </Box>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Heading mb={4}>Items</Heading>
              <CreateItem />
              <ItemList />
            </>
          }
        />
        <Route path=":id" element={<ItemDetail />} />
        <Route path=":id/edit" element={<EditItem />} />
      </Routes>
    </Container>
  );
}

export default App;
