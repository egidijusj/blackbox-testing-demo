import React, { Component } from "react";
import negate from "lodash/fp/negate";
import set from "lodash/fp/set";
import Header from "./Header";
import Todos from "./Todos";
import Footer from "./Footer";

const notCompleted = x => !x.completed;
const filters = {
  All: () => true,
  Active: notCompleted,
  Completed: x => !notCompleted(x)
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos,
      activeFilter: "All"
    };
  }

  toggle(i) {
    this.setState(({ todos }) => ({
      todos: todos.map((todo, j) => {
        return i === j ? set(["completed"], !todo.completed, todo) : todo;
      })
    }));
  }

  toggleAll(completed) {
    this.setState(({ todos }) => ({
      todos: todos.map((todo, j) => {
        return set(["completed"], completed, todo);
      })
    }));
  }

  rename(i, name) {
    this.setState(({ todos }) => ({
      todos: todos.map((todo, j) => {
        return i === j ? set(["name"], name, todo) : todo;
      })
    }));
  }

  remove(i) {
    this.setState(({ todos }) => ({
      todos: todos.filter((todo, j) => {
        return i !== j;
      })
    }));
  }

  render() {
    const { todos, activeFilter } = this.state;
    const filteredTodos = todos.filter(filters[activeFilter]);
    const remainingItems = todos.filter(notCompleted).length;
    return (
      <section className="todoapp">
        <div>
          <Header
            onAdd={name =>
              this.setState({ todos: [...todos, { name, completed: false }] })
            }
          />
          {todos.length > 0 && (
            <Todos
              todos={filteredTodos}
              toggle={i => this.toggle(i)}
              toggleAll={completed => this.toggleAll(completed)}
              rename={(i, name) => this.rename(i, name)}
              remove={i => this.remove(i)}
            />
          )}
          {todos.length > 0 && (
            <Footer
              activeFilter={activeFilter}
              onFilterChange={filter => this.setState({ activeFilter: filter })}
              remainingItems={remainingItems}
            />
          )}
        </div>
      </section>
    );
  }
}

export default App;
