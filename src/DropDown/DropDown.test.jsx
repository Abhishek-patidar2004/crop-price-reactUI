import React from "react";
import { shallow } from "enzyme";
import DropDown from "./DropDown";

describe("DropDown", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DropDown />);
    expect(wrapper).toMatchSnapshot();
  });
});
