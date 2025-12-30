import React from "react";
import { shallow } from "enzyme";
import MaxMinPrice from "./MaxMinPrice";

describe("MaxMinPrice", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MaxMinPrice />);
    expect(wrapper).toMatchSnapshot();
  });
});
