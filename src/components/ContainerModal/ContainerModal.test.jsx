import React from "react";
import { mount } from "enzyme";
import { DialogTitle, DialogContentText } from "@material-ui/core";
import ContainerModal from "./ContainerModal";
import { MockedProvider } from "../../test-utils";

const getWrapper = (props) =>
  mount(
    <MockedProvider initialState={{ modalState: { isOpen: true } }}>
      <ContainerModal {...props} />
    </MockedProvider>
  );

describe("<ContainerModal />", () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render a title", () => {
    const title = "dummy title";

    wrapper = getWrapper({ title });

    expect(wrapper.find(DialogTitle).exists()).toBe(true);
    expect(wrapper.find(DialogTitle).text()).toBe(title);
  });

  it("should render a description", () => {
    const description = "dummy description";

    wrapper = getWrapper({ description });

    expect(wrapper.find(DialogContentText).exists()).toBe(true);
    expect(wrapper.find(DialogContentText).text()).toBe(description);
  });
});