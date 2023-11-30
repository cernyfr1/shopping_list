import {
  ListItem,
  Checkbox,
  IconButton,
  Flex,
  Center,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {useState} from "react";
import { useFetch } from "use-http";


function ShoppingItem(props) {

  const id = props.id;
  const {put, response, del} = useFetch("http://localhost:9000");
  const [content, setContent] = useState(props.content)
  const [count, setCount] = useState(props.count)
  const [isChecked, setIsChecked] = useState(props.checked === "CHECKED");
  const [isEditing, setIsEditing] = useState(false);

  async function modifyItem(newContent = content, newCount = count) {
    await put("/shoppingItem/update", {
      id: id,
      content: newContent,
      count: newCount
    });
    return response.data;
  }

  async function handleChange() {
    setIsChecked(!isChecked);
    await put("/shoppingItem/update", {
      id: id,
      state: !isChecked ? "CHECKED" : "UNCHECKED"
    });
  }

  async function handleDelete() {
    await del(`/shoppingItem/delete?id=${id}`)
  }
  function handleSave(newContent, newCount) {
    modifyItem(newContent, newCount)
  }

  return (
      <ListItem
          height={"2.6rem"}
          border={"1px solid"}
          borderColor={"inherit"}
          borderRadius={"0.375rem"}
          margin={"0.6rem"}
      >
        <Flex>
          <Checkbox
              flex={"1"}
              size={"lg"}
              isChecked={isChecked}
              onChange={handleChange}
          />

            <Input value={content} border={"none"} borderRadius={"0"} isDisabled={!isEditing} onChange={(e) => setContent(e.target.value)}></Input>
            <NumberInput w="120px" defaultValue={props.count} keepWithinRange={true} min={1} onChange={(value) => setCount(Number(value))}>
              <NumberInputField borderRadius={"0"} disabled={!isEditing}></NumberInputField>
              {isEditing && Stepper()}
            </NumberInput>
            <IconButton
                aria-label={"Edit button"}
                size={"md"}
                borderRadius={"0"}
                icon={isEditing ? <FaRegSave /> : <FaEdit />}
                onClick={() => {if (isEditing){
                  handleSave();
                  setIsEditing(!isEditing)
                }else setIsEditing(!isEditing)}}
            />

          <IconButton
              aria-label={"Delete button"}
              borderLeftRadius={"0"}
              icon={<MdDelete />}
              onClick={handleDelete}
          />
        </Flex>
      </ListItem>
  );
}

function Stepper() {
  return(
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
  )
}

export default ShoppingItem;
