import React, { Component } from "react";
import Header from "./Header";
import Todos from "./Todos";
import Footer from "./Footer";
import {
  toggle,
  toggleAll,
  rename,
  remove,
  countRemaining,
  filter,
  add
} from "../model";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todos,
      activeFilter: "All"
    };
  }

  render() {
    const { todos, activeFilter } = this.state;
    return (
      <section className="todoapp">
        <div>
          <Header onAdd={name => this.setState({ todos: add(todos, name) })} />

          {todos.length > 0 && (
            <Todos
              todos={filter(todos, activeFilter)}
              toggle={i =>
                this.setState(({ todos }) => ({
                  todos: toggle(todos, todos[i])
                }))
              }
              toggleAll={completed =>
                this.setState(({ todos }) => ({
                  todos: toggleAll(todos, completed)
                }))
              }
              rename={(i, name) =>
                this.setState(({ todos }) => ({
                  todos: rename(todos, todos[i], name)
                }))
              }
              remove={i =>
                this.setState(({ todos }) => ({
                  todos: remove(todos, todos[i])
                }))
              }
            />
          )}

          {todos.length > 0 && (
            <Footer
              activeFilter={activeFilter}
              onFilterChange={filter => this.setState({ activeFilter: filter })}
              remainingItems={countRemaining(todos)}
            />
          )}
        </div>
      </section>
    );
  }
}

export default App;
