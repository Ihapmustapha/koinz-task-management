import React from "react";
import { mount } from "enzyme";

import Task from "./Task";

import { MockedProvider } from "../../../../test-utils";

jest.mock("react-beautiful-dnd", () => ({
  Droppable: ({ children }) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {}
    ),
  Draggable: ({ children }) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        innerRef: jest.fn(),
      },
      {}
    ),
  DragDropContext: ({ children }) => children,
}));

describe("<Task /> with no props", () => {
  const getContainer = (props) =>
    mount(
      <MockedProvider initialState={{ modalState: { isOpen: false } }}>
        <Task {...props} />
      </MockedProvider>
    );

  const container = getContainer({
    index: 0,
    onClick: (id) => {},
    classes: {},
    task: {
      id: "testTask",
      description: "test task",
      history: {},
      taskStatus: "todo",
    },
  });

  container.update();

  it("should match the snapshot", () => {
    expect(container.html()).toMatchSnapshot();
  });

  it("should contain a material ui paper as a card", () => {
    expect(container.find("[data-testid='task-paper-test-id']").exists()).toBe(
      true
    );
  });

  it("should have typography to render task description", () => {
    expect(
      container.find("[data-testid='desc-typography-test-id']").exists()
    ).toBe(true);
  });

  it("should have typography to render task description", () => {
    expect(container.find("[data-testid='view-task-fab']").exists()).toBe(true);
  });
});
