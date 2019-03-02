const renderVueApp = require("../../../src/vue/index").default;

module.exports = () => {
  let instance;
  return {
    setup: rootNode => {
      const vueRoot = document.createElement("div");
      vueRoot.id = "vue-root";
      rootNode.appendChild(vueRoot);
    },
    tearDown: () => {
      instance.$destroy();
    },
    render: (rootNode, todos) => {
      const vueRoot = rootNode.querySelector("#vue-root");
      instance = renderVueApp(vueRoot, { todos });
      return rootNode;
    }
  };
};
