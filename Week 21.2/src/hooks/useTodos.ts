//custom hook: name starts with hook and
// uses other hooks inside it

//a function name must start with "use" if it wants to use hooks inside it
import { useState, useEffect } from "react";
import axios from "axios";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos/").then((res) => {
      setTodos(res.data);
    });

    let interval = setInterval(() => {
      axios.get("https://jsonplaceholder.typicode.com/todos/").then((res) => {
        setTodos(res.data);
      });
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return todos;
}
