import Todo from "./Todo"
import { allCompleted } from "../model"

export default {
  props: ["todos", "toggleAll", "toggle", "remove", "rename"],
  computed: {
    allTodosCompleted() {
      return allCompleted(this.todos)
    }
  },
  render(h) {
    return h(
      "section",
      {
        class: "main"
      },
      [
        h("input", {
          class: "toggle-all",
          attrs: {
            id: "toggle-all"
          },
          domProps: {
            checked: this.allTodosCompleted,
            type: "checkbox"
          },
          on: {
            change: e => {
              this.toggleAll(e.target.checked)
            }
          }
        }),
        h("label", {
          attrs: {
            for: "toggle-all"
          }
        }),
        h(
          "ul",
          {
            class: "todo-list"
          },
          this.todos.map(todo =>
            h(Todo, {
              props: {
                todo,
                toggle: () => this.toggle(todo),
                remove: () => this.remove(todo),
                rename: name => this.rename(todo, name)
              }
            })
          )
        )
      ]
    )
  }
}
