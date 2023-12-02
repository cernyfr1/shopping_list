import {
  Box,
  Button,
  Flex,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import {useContext, useEffect, useState} from "react";
import {useFetch} from "use-http";

function AddItem(props) {

  const [content, setContent] = useState("");
  const [count, setCount] = useState(1);
  const {get, post, response} = useFetch("http://localhost:9000/shoppingItem");

  async function handleClick() {
    await post("/create", {
      content: content,
      count: count,
      state: "UNCHECKED"
    })
    props.refresh();
  }

  return (
    <Box>
      <Flex>
        <Input borderRightRadius={"0"} placeholder={"Item to add"} onChange={(e) => setContent(e.target.value)}></Input>
        <NumberInput w="100px" defaultValue={1} keepWithinRange={true} min={1} onChange={(value) => setCount(Number(value))}>
          <NumberInputField borderRadius={"0"} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button borderLeftRadius={"0"} onClick={handleClick}>Add</Button>
      </Flex>
    </Box>
  );
}

export default AddItem;
