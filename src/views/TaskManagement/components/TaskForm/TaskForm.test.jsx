import React from "react";
import { mount } from "enzyme";

import TaskForm from "./TaskForm";
import { MockedProvider } from "../../../../test-utils";

describe("<TaskForm /> with no props", () => {
  const getContainer = (props) =>
    mount(
      <MockedProvider
        initialState={{
          modalState: { isOpen: true },
          taskForm: { formType: "update" },
        }}
      >
        <TaskForm {...props} />
      </MockedProvider>
    );

  let container = getContainer({});

  it("should match the snapshot", () => {
    expect(container).toMatchSnapshot();
  });

  it("should contain a form", () => {
    expect(container.find("form").exists()).toBe(true);
  });

  it("should contain task details input", () => {
    expect(container.find("#test-description-input-id").exists()).toBe(true);
  });

  it("should have proper props for task details input", () => {
    expect(container.find("#test-description-input-id").at(1).props()).toEqual({
      variant: "outlined",
      placeholder: "Task Description",
      label: "Task Description",
      name: "description",
      rowsMax: 5,
      rows: 5,
      onChange: expect.any(Function),
      fullWidth: true,
      id: "test-description-input-id",
      multiline: true,
      value: "",
      classes: {
        root: "MuiTextField-root",
      },
    });
  });

  it("should change input value onChange", () => {
    container
      .find("#test-description-input-id")
      .at(1)
      .simulate("focus")
      .simulate("change", {
        target: {
          name: "description",
          value: "dummy task desc",
        },
      });

    container.update();
    expect(
      container.find("#test-description-input-id").at(1).props().value
    ).toEqual("dummy task desc");
  });

  it("should contain a button of type submit", () => {
    expect(container.find("button[type='submit']").exists()).toBe(true);
  });

  it("should contain a button for cancel", () => {
    expect(container.find("button[id='test-cancel-button']").exists()).toBe(
      true
    );
  });

  it("should contain a button for delete", () => {
    expect(container.find("button[id='test-delete-button']").exists()).toBe(
      true
    );
  });
});
