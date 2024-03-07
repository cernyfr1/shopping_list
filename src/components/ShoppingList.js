import { Text, Heading, List, VStack, Center } from "@chakra-ui/react";
import ShoppingItem from "./ShoppingItem";
import AddItem from "./AddItem";
import { useEffect, useState } from "react";

function ShoppingList() {
  const [shoppingList, setShoppingList] = useState([]);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:9000/shoppingItem/list");
        const newShoppingList = await response.json();
        setShoppingList(newShoppingList);
      } catch (error) {
        setError(error);
      } finally {
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
        <h1>Could not connect to the server.</h1>
        <h2>{error.message}</h2>
      </div>
    );
  }

  return (
    <Center>
      <VStack
        pt={"1rem"}
        pb={"2rem"}
        px={"2rem"}
        minWidth={"30%"}
        border={"1px solid"}
        borderColor={"inherit"}
        borderRadius={"0.375rem"}
      >
        <Heading>Shopping List Name</Heading>
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
    </Center>
  );
}

export default ShoppingList;
