import React from "react";
import Todo from "./Todo";

const completed = x => x.completed;

export default ({ todos, toggle, toggleAll, rename, remove }) => (
  <section className="main">
    <input
      id="toggle-all"
      className="toggle-all"
      type="checkbox"
      checked={todos.every(completed)}
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
