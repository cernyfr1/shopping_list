import {
  ListItem,
  Checkbox,
  IconButton,
  Flex,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useFetch } from "use-http";

function ShoppingItem(props) {
  const id = props.id;
  const { put, del } = useFetch("http://localhost:9000/shoppingItem");
  const [content, setContent] = useState(props.content);
  const [count, setCount] = useState(props.count);
  const [isChecked, setIsChecked] = useState(props.checked === "CHECKED");
  const [isEditing, setIsEditing] = useState(false);

  async function modifyItem(newContent = content, newCount = count) {
    await put("/update", {
      id: id,
      content: newContent,
      count: newCount,
    });
  }

  async function handleChange() {
    setIsChecked(!isChecked);
    await put("/update", {
      id: id,
      state: !isChecked ? "CHECKED" : "UNCHECKED",
    });
  }

  async function handleDelete() {
    if (window.confirm(`Do you really want to delete ${content}?`) === true) {
      await del(`/delete?id=${id}`);
      props.refresh();
    }
  }
  function handleSave(newContent, newCount) {
    modifyItem(newContent, newCount);
  }

  return (
    <ListItem
      height={"2.6rem"}
      border={"1px solid"}
      borderColor={"inherit"}
      borderRadius={"0.375rem"}
      margin={"0.6rem"}
      data-testid={id}
    >
      <Flex>
        <Checkbox
          data-testid={"checkbox"}
          size={"lg"}
          marginLeft={"0.8rem"}
          isChecked={isChecked}
          onChange={handleChange}
        />
        <Input
          data-testid={"content"}
          width={"11rem"}
          value={content}
          border={"none"}
          borderRadius={"0"}
          isDisabled={!isEditing}
          onChange={(e) => setContent(e.target.value)}
        ></Input>
        <NumberInput
          w={"5rem"}
          defaultValue={props.count}
          keepWithinRange={true}
          min={1}
          onChange={(value) => setCount(Number(value))}
        >
          <NumberInputField
            data-testid={"count"}
            borderRadius={"0"}
            disabled={!isEditing}
          ></NumberInputField>
          {isEditing && <Stepper />}
        </NumberInput>
        <IconButton
          aria-label={"Edit button"}
          size={"md"}
          borderRadius={"0"}
          icon={isEditing ? <FaRegSave /> : <FaEdit />}
          onClick={() => {
            if (isEditing) {
              handleSave();
              setIsEditing(!isEditing);
            } else setIsEditing(!isEditing);
          }}
        />
        <IconButton
          aria-label={"Delete button"}
          borderLeftRadius={"0"}
          color={"red"}
          icon={<MdDelete />}
          onClick={handleDelete}
        />
      </Flex>
    </ListItem>
  );
}

function Stepper() {
  return (
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  );
}

export default ShoppingItem;
