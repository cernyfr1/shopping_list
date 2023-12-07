import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders main app page", () => {
  render(<App />);
  const headings = screen.getAllByRole("heading");
  headings.map((heading) => expect(heading).toBeInTheDocument());
});
