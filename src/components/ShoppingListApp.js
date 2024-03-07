import { Heading, VStack, Center, Select } from "@chakra-ui/react";
import ShoppingList from "./ShoppingList";
import { getListsByUser } from "../services/restServices";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useEffect, useState } from "react";

function ShoppingListApp() {
  const user = useAuthUser().name;

  const [userLists, setUserLists] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLists() {
      try {
        const userLists = await getListsByUser(user);
        setUserLists(userLists);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchLists();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Center>
      <VStack>
        <Heading>Shopping List App</Heading>
        <Select placeholder="Select option">
          {userLists.map((list) => (
            <option value={list.name} key={list.name}>
              {list.name}
            </option>
          ))}
        </Select>
        <ShoppingList />
      </VStack>
    </Center>
  );
}

export default ShoppingListApp;
