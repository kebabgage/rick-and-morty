import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("should render the heading and table", () => {
    render(<App />);

    expect(screen.getByText("Rick and Morty Characters")).toBeInTheDocument();
    expect(screen.getByTestId("character-table")).toBeInTheDocument();
  });
});
