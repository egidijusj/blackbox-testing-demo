const { unmountComponentAtNode } = require("react-dom");
const renderReactApp = require("../../../src/react/index").default;

module.exports = () => {
  return {
    setup: () => {},
    tearDown: rootNode => {
      unmountComponentAtNode(rootNode);
    },
    render: (rootNode, todos) => {
      renderReactApp(rootNode, { todos });
      return rootNode;
    }
  };
};
