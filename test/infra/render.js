const renderReactApp = require("../../src/react/index").default;
const renderVueApp = require("../../src/vue/index").default;

const render = todos => {
  const root = document.querySelector("#root");
  const rootParent = root.parentElement
  // renderReactApp(root, { todos });
  renderVueApp(root, { todos });

  return rootParent;
};

module.exports = render;
