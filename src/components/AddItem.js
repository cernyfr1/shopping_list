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

function AddItem() {
  return (
    <Box>
      <Flex>
        <Input borderRightRadius={"0"}></Input>
        <NumberInput w="120px">
          <NumberInputField borderRadius={"0"} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button borderLeftRadius={"0"}>Add</Button>
      </Flex>
    </Box>
  );
}

export default AddItem;
