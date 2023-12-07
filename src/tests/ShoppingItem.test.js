import { render, screen } from "@testing-library/react";
import ShoppingItem from "../components/ShoppingItem";
import { List } from "@chakra-ui/react";

test("render ShoppingItem component", () => {
  const item = {
    content: "Apple",
    count: 8,
    state: "UNCHECKED",
    id: "1",
  };
  render(
    <List>
      <ShoppingItem
        id={item.id}
        content={item.content}
        count={item.count}
        checked={item.state}
      />
    </List>,
  );
  const ShoppingItemElement = screen.getByTestId(item.id);
  const ItemContentElement = screen.getByTestId("content").value;
  const CountElement = Number(screen.getByTestId("count").value);
  const CheckBoxElement = screen.getByRole("checkbox");
  expect(ShoppingItemElement).toBeInTheDocument();
  expect(ItemContentElement).toBe(item.content);
  expect(CountElement).toEqual(item.count);
  if (item.state === "CHECKED") expect(CheckBoxElement).toBeChecked();
  if (item.state === "UNCHECKED") expect(CheckBoxElement).not.toBeChecked();
});
