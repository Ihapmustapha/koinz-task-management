import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { configureStore } from "../store";

const MockedProvider = ({ initialState, children }) => (
  <Provider store={configureStore(initialState)}>{children}</Provider>
);

MockedProvider.propTypes = {
  initialState: PropTypes.shape({}).isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default MockedProvider;
