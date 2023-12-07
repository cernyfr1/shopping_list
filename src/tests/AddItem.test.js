import { cleanup, render, screen } from "@testing-library/react";
import AddItem from "../components/AddItem";

afterEach(() => {
  cleanup();
});

test("render AddItem component", () => {
  render(<AddItem />);
  const addItemElement = screen.getByTestId("addItem");
  expect(addItemElement).toBeInTheDocument();
  let insideElements = screen.getAllByRole("button");
  insideElements.push(screen.getByRole("spinbutton"));
  insideElements.push(screen.getByRole("textbox"));
  insideElements.map((element) =>
    expect(addItemElement).toContainElement(element),
  );
});
