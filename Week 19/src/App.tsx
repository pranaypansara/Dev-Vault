import { APITester } from "./APITester";
import axios from "axios";
import { useState, useEffect } from "react";

export function App() {
  let [data, setData] = useState([]);

  //if the dependency array (2nd argument) is empty
  //then this function runs only on the first render (mount)
  useEffect(function () {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <div className="app">
      {data.map((todo) => (
        <Todo title={todo.title} />
      ))}
    </div>
  );
}

function Todo(props: { title: string }) {
  return (
    <div style={{ margin: 10, border: "2px solid black" }}>
      <div>{props.title}</div>
    </div>
  );
}

export default App;
