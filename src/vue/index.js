import Vue from "vue";
import App from "./App";

export default (root, { todos }) => {
  new Vue({
    render(h) {
      return h(App, { props: { todos } });
    },
    el: root
  });
};
