import "./App.css";

import { ChakraProvider, List, VStack } from "@chakra-ui/react";
import ShoppingItem from "./components/ShoppingItem";
import AddItem from "./components/AddItem";
import { useFetch } from "use-http";
import { useEffect, useState } from "react";

export default App;

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const { get, post, response, loading, error } = useFetch(
    "http://localhost:9000/shoppingItem",
  );

  useEffect(() => {
    loadShoppingList();
  }, []);

  async function loadShoppingList() {
    const shoppingList = await get("/list");
    if (response.ok) setShoppingList(shoppingList);
  }

  if (error) {
    return (
      <div>
        <h2>{error.message}</h2>
      </div>
    );
  }

  if (loading) {
    return <h2>loading...</h2>;
  }

  return (
    <ChakraProvider>
      <VStack>
        <h1>Shopping List</h1>
        <AddItem />
        <h2>To buy:</h2>
        <List>
          {shoppingList.map((item) => (
            <ShoppingItem
              key={item.id}
              name={item.content}
              count={item.count}
              checked={item.state}
            />
          ))}
        </List>
      </VStack>
    </ChakraProvider>
  );
}
