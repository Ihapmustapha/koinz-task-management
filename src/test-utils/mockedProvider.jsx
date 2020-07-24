import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../store";

const MockedProvider = ({ initialState, children }) => (
  <Provider store={configureStore(initialState)}>{children}</Provider>
);

export default MockedProvider;
