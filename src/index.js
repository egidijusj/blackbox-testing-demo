import "./index.css"
import renderApp from "./app"

const todos = [
  { name: "write app in vue", completed: true },
  { name: "add black-box tests", completed: true },
  { name: "rewrite app in react", completed: false },
  { name: "profit!", completed: false }
]

renderApp(document.getElementById("root"), { todos })
