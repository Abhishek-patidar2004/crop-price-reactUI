import React from "react";
import { shallow } from "enzyme";
import Compare from "./Compare";

describe("Compare", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Compare />);
    expect(wrapper).toMatchSnapshot();
  });
});
