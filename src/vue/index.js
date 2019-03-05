import Vue from "vue"
import App from "./App"
Vue.config.productionTip = false

export default (root, { todos }) => {
  const vm = new Vue({
    render(h) {
      return h(App, { props: { todos } })
    },
    el: root
  })
  return () => vm.$destroy()
}
