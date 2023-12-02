import "./App.css";

import {Button, ChakraProvider, List, VStack} from "@chakra-ui/react";
import ShoppingItem from "./components/ShoppingItem";
import AddItem from "./components/AddItem";
import { useFetch } from "use-http";
import {useEffect, useState} from "react";

export default App;

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect (() => {
  const fetchPosts = async ()=> {
      setIsLoading (true);
      try {
        const response = await fetch("http://localhost:9000/shoppingItem/list");
        const newShoppingList = await response.json();
        setShoppingList(newShoppingList);
      } catch (e) {
        setError(e);
      } finally {
          setIsLoading (false);
      }};
        fetchPosts();
    }, [refreshIndex]);

  function refresh() {
      setRefreshIndex(refreshIndex + 1);
  }

  if (error) {
    return (
      <div>
        <h2>{error.message}</h2>
      </div>
    );
  }

  return (
        <ChakraProvider>
          <VStack>
            <h1>Shopping List</h1>
            <AddItem refresh={refresh}/>
            <h2>To buy:</h2>
            <List>
              {shoppingList.map((item) => (
                <ShoppingItem key={item._id}
                              id={item._id}
                              content={item.content}
                              count={item.count}
                              checked={item.state}
                              refresh={refresh}
                />
              ))}
            </List>
          </VStack>
        </ChakraProvider>
  );
}
