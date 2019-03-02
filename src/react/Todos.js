import React from "react";
import Todo from "./Todo";
import { allCompleted } from "../model";

export default ({ todos, toggle, toggleAll, rename, remove }) => (
  <section className="main">
    <input
      id="toggle-all"
      className="toggle-all"
      type="checkbox"
      checked={allCompleted(todos)}
      onChange={e => toggleAll(e.target.checked)}
    />
    <label htmlFor="toggle-all" />
    <ul className="todo-list">
      {todos.map((todo, i) => (
        <Todo
          key={todo.name}
          toggle={() => toggle(i, todo)}
          rename={name => rename(i, name)}
          remove={() => remove(i)}
          todo={todo}
        />
      ))}
    </ul>
  </section>
);
