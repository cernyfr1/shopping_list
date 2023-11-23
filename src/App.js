import "./App.css";

import { ChakraProvider, List, VStack } from "@chakra-ui/react";
import ShoppingItem from "./components/ShoppingItem";
import AddItem from "./components/AddItem";

function App() {
  return (
    <ChakraProvider>
      <VStack>
        <h1>Shopping List</h1>
        <AddItem />
        <h2>To buy:</h2>
        <List>
          <ShoppingItem></ShoppingItem>
        </List>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
