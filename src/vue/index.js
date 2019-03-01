import Vue from "vue";
import App from "./App";

// console.log(require.resolve("vue"));
// throw Error(require.resolve("vue"));
// function Vue() {}
// function App() {}

export default (root, { todos }) => {
  new Vue({
    render(h) {
      return h(App, { props: { todos } });
    },
    el: root
  });
};
