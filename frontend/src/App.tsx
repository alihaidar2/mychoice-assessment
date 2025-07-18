// src/App.tsx
import React from "react";
import { Box, Link } from "@chakra-ui/react";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ItemList } from "./components/ItemList";
import { CreateItem } from "./components/CreateItem";
import { ItemDetail } from "./components/ItemDetail";
import { EditItem } from "./components/EditItem";

function App() {
  return (
    <Layout>
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
              <CreateItem />
              <ItemList />
            </>
          }
        />
        <Route path=":id" element={<ItemDetail />} />
        <Route path=":id/edit" element={<EditItem />} />
      </Routes>
    </Layout>
  );
}

export default App;
