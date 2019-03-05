import "./index.css"
import renderApp from "./app"

const todos = [
  { name: "code app in react", completed: true },
  { name: "blackbox-test it", completed: true },
  { name: "rewrite app in vue", completed: false },
  { name: "profit!", completed: false }
]

renderApp(document.getElementById("root"), { todos })
