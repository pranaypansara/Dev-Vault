//context api solves the problem of prop drilling
import { useState, useEffect, useRef } from "react";
import { useTodos } from "./hooks/useTodos";
import { setTodosContext } from "./context";
import { useContext } from "react";

export function App() {
  const { todos, setTodos } = useTodos();

  return (
    <setTodosContext.Provider value={{ setTodos }}>
      <div>
        {todos.map((todo) => (
          <Todo title={todo.title} id={todo.id} />
        ))}
      </div>
    </setTodosContext.Provider>
  );
}

function Todo({ title, id }) {
  return (
    <div style={{ margin: 10, padding: 10, border: "2px solid black" }}>
      <div>{title}</div>
      <DeleteButton id={id} />
    </div>
  );
}

function DeleteButton({ id }) {
  const { setTodos } = useContext(setTodosContext);

  return (
    <div>
      <button
        onClick={() => setTodos((todos) => todos.filter((x) => x.id != id))}
      >
        Delete
      </button>
      ;
    </div>
  );
}

export default App;
