import { ListItem, Checkbox, IconButton, Flex } from "@chakra-ui/react";

function ShoppingItem() {
  return (
    <ListItem
      height={"2.5rem"}
      border={"1px solid"}
      borderColor={"inherit"}
      borderRadius={"0.375rem"}
    >
      <Flex w={"200px"}>
        <Checkbox flex={"1"} size={"lg"}>
          Item 1
        </Checkbox>
        <IconButton aria-label={"Edit button"} />
        <IconButton aria-label={"Delete button"} />
      </Flex>
    </ListItem>
  );
}

export default ShoppingItem;
