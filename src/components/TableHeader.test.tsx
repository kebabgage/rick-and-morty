import { render, screen } from "@testing-library/react";
import { ColumnValues } from "./TableRow";
import { TableHeader } from "./TableHeader";

const columnValues: ColumnValues[] = [
  { value: "Name", columnSize: 1 },
  { value: "Age", columnSize: 1 },
  { value: "Gender", columnSize: 1 },
  { value: "Origin", columnSize: 1 },
];

describe("TableHeader", () => {
  test("should render columnValues correctly", () => {
    render(<TableHeader columnValues={columnValues} />);

    for (const value of columnValues) {
      expect(screen.getByText(value.value)).toBeInTheDocument();
    }
  });
});
