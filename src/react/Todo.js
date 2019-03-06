import React, { Component } from "react"
import classnames from "classnames"

class Todo extends Component {
  constructor() {
    super()
    this.state = {
      editing: false,
      value: ""
    }
  }

  render() {
    const { todo, toggle, rename, remove } = this.props
    const { editing, value } = this.state
    return (
      <li className={classnames({ completed: todo.completed, editing })}>
        <div className="view">
          {!editing && (
            <input
              className="toggle"
              type="checkbox"
              checked={Boolean(todo.completed)}
              onChange={toggle}
            />
          )}

          {!editing && (
            <label
              onDoubleClick={() => {
                this.setState({ editing: true, value: todo.name })
                setImmediate(() => this.input && this.input.focus())
              }}
            >
              {todo.name}
            </label>
          )}
        </div>
        <input
          ref={ref => (this.input = ref)}
          className="edit"
          value={value}
          onChange={e =>
            this.setState({ editing: true, value: e.target.value })
          }
          onBlur={() => this.setState({ editing: false })}
          onKeyDown={e => {
            if (e.key === "Enter") {
              value === "" ? remove() : rename(value)
              this.setState({ editing: false })
            } else if (e.key === "Escape") {
              this.setState({ editing: false })
            }
          }}
        />
      </li>
    )
  }
}

export default Todo
