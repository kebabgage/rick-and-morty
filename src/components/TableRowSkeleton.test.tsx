import { TableRowSkeleton } from "./TableRowSkeleton";
import { screen, render, within } from "@testing-library/react";

describe("TableRowSkeleton", () => {
  test("should render proper amount of cells", () => {
    render(<TableRowSkeleton columnSizes={[1, 2, 3, 4]} />);

    const rows = screen.getAllByTestId("table-row");
    expect(rows).toHaveLength(20);

    // Within each row there should be the amount of columns per the column sizes
    for (const row of rows) {
      expect(within(row).getAllByTestId("cell-loading-skeleton")).toHaveLength(
        4
      );
    }
  });
});
