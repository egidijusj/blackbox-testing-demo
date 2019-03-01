const renderVueApp = require("../../../src/vue/index").default;

module.exports = () => {
  return {
    setup: rootNode => {
      const vueRoot = document.createElement("div");
      vueRoot.id = "vue-root";
      rootNode.appendChild(vueRoot);
    },
    tearDown: () => {},
    render: (rootNode, todos) => {
      const vueRoot = rootNode.querySelector("#vue-root");
      renderVueApp(vueRoot, { todos });
      return rootNode;
    }
  };
};
