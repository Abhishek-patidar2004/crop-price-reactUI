import React from "react";
import { shallow } from "enzyme";
import CheckPrice from "./CheckPrice";

describe("CheckPrice", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CheckPrice />);
    expect(wrapper).toMatchSnapshot();
  });
});
