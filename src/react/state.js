import { createStore } from "redux"

const reducer = (state, action) => {
  switch (action.type) {
    case "setTodos":
      return { ...state, ...{ todos: action.todos } }
    default:
      return state
  }
}

export default ({ todos }) => createStore(reducer, { todos })
