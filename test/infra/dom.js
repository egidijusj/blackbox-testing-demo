const renderVue = Boolean(process.env.VUE);
const createReactAdapter = require("./dom-adapter/react");
const createVueAdapter = require("./dom-adapter/vue");

module.exports = ({ beforeEach, afterEach }) => {
  const domAdapter = renderVue ? createVueAdapter() : createReactAdapter();

  beforeEach(() => {
    const newBody = document.createElement("body");
    document.body = newBody;

    const rootNode = document.createElement("div");
    rootNode.id = "root";

    document.body.appendChild(rootNode);

    domAdapter.setup(rootNode);
  });

  afterEach(() => {
    const rootNode = document.querySelector("#root");
    domAdapter.tearDown(rootNode);
  });

  return {
    render: todos => domAdapter.render(document.querySelector("#root"), todos)
  };
};
