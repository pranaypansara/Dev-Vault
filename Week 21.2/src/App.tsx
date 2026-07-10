import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useTodos } from "./hooks/useTodos";

export function App() {
  const todos = useTodos();

  return (
    <div>
      {todos.map((todo) => (
        <div style={{ padding: 20, border: "2px solid black" }}>
          {todo.title}
        </div>
      ))}
    </div>
  );
}

export default App;
