import React from "react";
import { mount } from "enzyme";

import Column from "./Column";
import TaskManagement from "../../TaskManagement";

import { MockedProvider } from "../../../../test-utils";

describe("<Column /> with no props", () => {
  const getContainer = (props) =>
    mount(
      <MockedProvider initialState={{ modalState: { isOpen: false } }}>
        <TaskManagement>
          <Column {...props} />
        </TaskManagement>
      </MockedProvider>
    );

  const container = getContainer({});

  it("should match the snapshot", () => {
    expect(container.html()).toMatchSnapshot();
  });

  it("should contain typography title", () => {
    expect(container.find("#column-title-test-id").at(1).text()).toBe("To Do");
  });

  it("should contain Fab button to add new task when column is To Do", () => {
    expect(container.find("#add-task-fab-test-id").exists()).toBe(true);
  });
});
