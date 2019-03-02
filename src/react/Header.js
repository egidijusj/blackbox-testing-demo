import React, { useState } from "react";

export default ({ onAdd }) => {
  const [input, setInput] = useState("");
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        ref={ref => ref && ref.focus()}
        className="new-todo"
        placeholder="What needs to be done?"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            onAdd(input.trim());
            setInput("");
          }
        }}
      />
    </header>
  );
};
