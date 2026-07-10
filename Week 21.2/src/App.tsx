import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useTodos } from "./hooks/useTodos";

export function App() {
  const { todos, setTodos } = useTodos();

  return (
    <div>
      {todos.map((todo) => (
        <Todo title={todo.title} id={todo.id} setTodos={setTodos} />
      ))}
    </div>
  );
}

function Todo({ title, id, setTodos }) {
  return (
    <div style={{ margin: 10, padding: 10, border: "2px solid black" }}>
      <div>{title}</div>
      <button
        onClick={() => {
          setTodos((todos) => todos.filter((x) => x.id != id));
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default App;
