import React from "react"
import ReactDOM from "react-dom"
import createStore from "./state"
import { Provider } from "react-redux"
import App from "./App"

export default (root, { todos }) => {
  ReactDOM.render(
    <Provider store={createStore({ todos })}>
      <App todos={todos} />
    </Provider>,
    root
  )
  return () => ReactDOM.unmountComponentAtNode(root)
}
