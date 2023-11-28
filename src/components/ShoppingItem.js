import { ListItem, Checkbox, IconButton, Flex, Center } from "@chakra-ui/react";
//import { LiaSaveSolid } from "react-icons/lia";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {useState} from "react";
import { useFetch } from "use-http";

function ShoppingItem(props) {

  const {put} = useFetch("http://localhost:9000/shoppingItem");
  const [isChecked, setIsChecked] = useState(props.checked === "CHECKED");

  async function modifyItem() {
    await put("/update", {
      id: "6564d33b789005500bc7809c",
      content: "Apple",
      count: 3,
      state: !isChecked ? "CHECKED" : "UNCHECKED"
    });

  }

  function handleChange() {
    modifyItem();
    setIsChecked(!isChecked);
  }

  return (
    <ListItem
      height={"2.6rem"}
      border={"1px solid"}
      borderColor={"inherit"}
      borderRadius={"0.375rem"}
      margin={"0.6rem"}
    >
      <Flex minWidth={"200px"}>
        <Checkbox
          flex={"1"}
          size={"lg"}
          isChecked={isChecked}
          onChange={handleChange}
        >
          {props.name}
        </Checkbox>
        <Center marginLeft={"0.6rem"}>{props.count} </Center>
        <IconButton
          aria-label={"Edit button"}
          size={"md"}
          borderRadius={"0"}
          marginLeft={"0.6rem"}
          icon={<FaEdit />}
        />
        <IconButton
          aria-label={"Delete button"}
          borderLeftRadius={"0"}
          icon={<MdDelete />}
        />
      </Flex>
    </ListItem>
  );
}

export default ShoppingItem;
