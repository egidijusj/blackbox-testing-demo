import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

export default (root, { todos }) =>
  ReactDOM.render(<App todos={todos} />, root);
