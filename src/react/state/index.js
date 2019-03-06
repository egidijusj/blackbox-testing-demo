import { createStore } from "redux"
import { process } from "../../model"
import enhancer from "./enhancer"

const reducer = (state, action) => {
  switch (action.type) {
    case "setTodos":
      return { ...state, ...{ todos: process(action.todos) } }

    case "setFilter":
      return { ...state, ...{ filter: action.filter } }
    default:
      return state
  }
}

export default ({ todos }) =>
  createStore(reducer, { todos: process(todos), filter: "All" }, enhancer())
