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
  constructor(props) {
    super(props)
    this.state = {
      activeFilter: "All"
    }
  }

  render() {
    const { activeFilter } = this.state
    const { todos, setTodos } = this.props

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
              onFilterChange={filter => this.setState({ activeFilter: filter })}
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
    todos: state.todos
  }),
  {
    setTodos: todos => ({ type: "setTodos", todos })
  }
)(App)
