import { render, fireEvent } from "@testing-library/react";
import Autocomplete, { AutocompleteProps } from "../Autocomplete";
import ReactDOM from "react-dom";
import React from "react";
import RepoIcon from "../../common/RepoIcon/RepoIcon";
import "@testing-library/jest-dom/extend-expect";

const initialProps: AutocompleteProps = {
  value: "",
  isLoading: false,
  items: [
    {
      id: 38092364,
      subtitle: "Github user",
      title: "golota60",
      url: "https://github.com/fdsfasdfas",
      icon: <RepoIcon />,
    },
    {
      id: 2,
      subtitle: "Github user",
      title: "fdsfasdfas",
      url: "https://github.com/fdsfasdfas",
      icon: <RepoIcon />,
    },
  ],
  onChange: () => "",
  isError: false
};

describe("<Autocomplete />", () => {
  it("Should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Autocomplete {...initialProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Should render with a custom classname", () => {
    const { getByTestId } = render(
      <Autocomplete {...initialProps} className="custom-classname" />
    );
    expect(getByTestId("autocomplete-component")).toBeInTheDocument();
    expect(getByTestId("autocomplete-component")).toHaveClass(
      "custom-classname"
    );
  });

  it("Should be in loading state", () => {
    const { getByTestId } = render(
      <Autocomplete {...initialProps} isLoading />
    );
    expect(getByTestId("autocomplete-component")).toContainElement(getByTestId("loading-icon"));
  });

  it("Should be in error state", () => {
    const errorText = "Oops, something went wrong";
    const { getByTestId } = render(<Autocomplete {...initialProps} isError />);
    expect(getByTestId("autocomplete-component")).toHaveTextContent(errorText);
  });

  it("Should render list of results", () => {
    const { getByTestId } = render(<Autocomplete {...initialProps} />);
    const input = getByTestId('generic-input');
    expect(getByTestId("autocomplete-component")).toContainElement(
      getByTestId("autocomplete-itemlist")
    );
    fireEvent.change(input, {target: {value: 'siema'}})
    expect(getByTestId("autocomplete-itemlist").children).toHaveLength(initialProps.items.length)
  });
});
