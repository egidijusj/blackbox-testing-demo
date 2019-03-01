import Todo from "./Todo";

const completed = x => x.completed;

export default {
  props: ["todos", "toggleAll", "toggle", "remove", "rename"],
  computed: {
    allTodosCompleted() {
      return this.todos.every(completed);
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
              this.toggleAll(e.target.checked);
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
    );
  }
};

// <section className="main">
//   <input
//     id="toggle-all"
//     className="toggle-all"
//     type="checkbox"
//     checked={todos.every(completed)}
//     onChange={e => toggleAll(e.target.checked)}
//   />
//   <label htmlFor="toggle-all" />
//   <ul className="todo-list">
//     {todos.map((todo, i) => (
//       <Todo
//         key={todo.name}
//         toggle={() => toggle(i, todo)}
//         rename={name => rename(i, name)}
//         remove={() => remove(i)}
//         todo={todo}
//       />
//     ))}
//   </ul>
// </section>;
