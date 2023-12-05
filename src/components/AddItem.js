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
import {useState} from "react";
import {useFetch} from "use-http";

function AddItem(props) {

  const [content, setContent] = useState("");
  const [count, setCount] = useState(1);
  const {post, response} = useFetch("http://localhost:9000/shoppingItem");

  async function postDB() {
    try {
      await post("/create", {
        content: content,
        count: count,
        state: "UNCHECKED"}
      )
    } catch (error) {
      console.error(error);
    } finally {
      props.refresh();
      setContent("");
      setCount(1);
    }
  }

  return (
    <Box>
      <Flex>
        <Input borderRightRadius={"0"} placeholder={"Item to add"} value={content} onChange={(e) => setContent(e.target.value)}></Input>
        <NumberInput w="100px" defaultValue={1} keepWithinRange={true} min={1} value={count} onChange={(value) => setCount(Number(value))}>
          <NumberInputField borderRadius={"0"} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button borderLeftRadius={"0"} onClick={postDB}>Add</Button>
      </Flex>
    </Box>
  );
}

export default AddItem;
