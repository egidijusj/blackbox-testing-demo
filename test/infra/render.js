const renderReactApp = require("../../src/react/index").default;

const render = todos => {
  const root = document.querySelector("#root");
  renderReactApp(root, { todos });
  return root;
};

module.exports = render;
