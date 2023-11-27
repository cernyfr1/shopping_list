import { ListItem, Checkbox, IconButton, Flex } from "@chakra-ui/react";
import { LiaSaveSolid } from "react-icons/lia";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function ShoppingItem() {
  return (
    <ListItem
      height={"2.6rem"}
      border={"1px solid"}
      borderColor={"inherit"}
      borderRadius={"0.375rem"}
    >
      <Flex>
        <Checkbox flex={"1"} size={"lg"}>
          Item 1
        </Checkbox>
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
