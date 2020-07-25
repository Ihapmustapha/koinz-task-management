import React from "react";
import { mount } from "enzyme";
import {
  DialogTitle,
  DialogContentText,
  DialogContent,
} from "@material-ui/core";
import ContainerModal from "./ContainerModal";
import { MockedProvider } from "../../test-utils";

const getWrapper = (props) =>
  mount(
    <MockedProvider initialState={{ modalState: { isOpen: true } }}>
      <ContainerModal {...props} />
    </MockedProvider>
  );

let wrapper = getWrapper({});

describe("<ContainerModal />", () => {
  it("should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
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

  it("should render the children inside the Content", () => {
    const DummyContent = () => <div>Dummy Content</div>;

    wrapper = getWrapper({ children: <DummyContent /> });

    expect(wrapper.find(DialogContent).find(DummyContent).exists()).toBe(true);
  });
});
