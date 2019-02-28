import "./index.css";
import "./base.css";
import "./index.1.css";
import ReactApp from "./react";

const todos = [
  { name: "react is cooler", completed: true },
  { name: "hello", completed: false },
  { name: "sweet baby jesus", completed: false }
];

ReactApp(document.getElementById("root"), { todos });
