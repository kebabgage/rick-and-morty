import { render, screen } from "@testing-library/react";
import { AttributeValue } from "./AttributeValue";

describe("AttributeValue", () => {
  test("should render attribute value correctly", () => {
    render(<AttributeValue attribute="Name" value={"James"} />);

    expect(screen.getByTestId("name-attribute")).toHaveTextContent("Name");
    expect(screen.getByTestId("name-value")).toHaveTextContent("James");
  });
});
