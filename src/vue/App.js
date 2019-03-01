import Header from "./Header";
import Todos from "./Todos";
import Footer from "./Footer";
import { toggle, toggleAll, add, remove, rename } from "../model";

const notCompleted = x => !x.completed;
const filters = {
  All: () => true,
  Active: notCompleted,
  Completed: x => !notCompleted(x)
};

export default {
  props: ["todos"],
  computed: {
    remainingItems() {
      return this.localTodos.filter(notCompleted).length;
    },
    filteredTodos() {
      return this.localTodos.filter(filters[this.activeFilter]);
    }
  },
  data() {
    return { activeFilter: "All", localTodos: this.todos };
  },
  methods: {
    onFilterChange(filter) {
      this.activeFilter = filter;
    },
    toggleAll(completed) {
      this.localTodos = toggleAll(this.localTodos, completed);
    },
    toggle(todo) {
      this.localTodos = toggle(this.localTodos, todo);
    },
    onAdd(name) {
      this.localTodos = add(this.localTodos, name);
    },
    remove(todo) {
      this.localTodos = remove(this.localTodos, todo);
    },
    rename(todo, name) {
      this.localTodos = rename(this.localTodos, todo, name);
    }
  },
  render(h) {
    return h("section", { class: "todoapp" }, [
      h("div", [
        h(Header, {
          props: {
            onAdd: this.onAdd
          }
        }),
        this.localTodos.length > 0 &&
          h(Todos, {
            props: {
              todos: this.filteredTodos,
              toggleAll: this.toggleAll,
              toggle: this.toggle,
              remove: this.remove,
              rename: this.rename
            }
          }),
        this.localTodos.length > 0 &&
          h(Footer, {
            props: {
              remainingItems: this.remainingItems,
              activeFilter: "All",
              onFilterChange: this.onFilterChange
            }
          })
      ])
    ]);
  }
};
