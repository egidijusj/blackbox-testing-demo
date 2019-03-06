import React, { Component } from "react"
import { connect } from "react-redux"
import Header from "./Header"
import Todos from "./Todos"
import Footer from "./Footer"
import {
  toggle,
  toggleAll,
  rename,
  remove,
  countRemaining,
  filter,
  add
} from "../model"

class App extends Component {
  render() {
    const { todos, activeFilter, setTodos, setActiveFilter } = this.props

    return (
      <section className="todoapp">
        <div>
          <Header onAdd={name => setTodos(add(todos, name))} />

          {todos.length > 0 && (
            <Todos
              todos={filter(todos, activeFilter)}
              toggle={i => setTodos(toggle(todos, todos[i]))}
              toggleAll={completed => setTodos(toggleAll(todos, completed))}
              rename={(i, name) => setTodos(rename(todos, todos[i], name))}
              remove={i => setTodos(remove(todos, todos[i]))}
            />
          )}

          {todos.length > 0 && (
            <Footer
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              remainingItems={countRemaining(todos)}
            />
          )}
        </div>
      </section>
    )
  }
}

export default connect(
  state => ({
    todos: state.todos,
    activeFilter: state.filter
  }),
  {
    setTodos: todos => ({ type: "setTodos", todos }),
    setActiveFilter: filter => ({ type: "setFilter", filter })
  }
)(App)
