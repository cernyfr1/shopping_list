import { Text, ChakraProvider, Heading, List, VStack } from "@chakra-ui/react";
import ShoppingItem from "./components/ShoppingItem";
import AddItem from "./components/AddItem";
import { useEffect, useState } from "react";

export default App;

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:9000/shoppingItem/list");
        const newShoppingList = await response.json();
        setShoppingList(newShoppingList);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [refreshIndex]);

  function refresh() {
    setRefreshIndex(refreshIndex + 1);
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <ChakraProvider>
      <VStack p={"2rem"}>
        <Heading>Shopping List</Heading>
        <AddItem refresh={refresh} />
        <Heading size={"lg"}>To buy:</Heading>
        <List>
          {shoppingList.length === 0 && <Text>the list is empty...</Text>}
          {shoppingList.map((item) => (
            <ShoppingItem
              key={item._id}
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
